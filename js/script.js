$(document).ready(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) str += chars[Math.floor(Math.random() * chars.length)];
        return str;
    }
    //*****************************************COLUMN CLASS******************************************************
    function Column(name) {
        this.name = name;
        this.id = randomString();
        this.$element = this.createColumn();
    }
    Column.prototype = {
        createColumn: function() {
            var self = this;
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(this.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnForm = $('<form>').addClass('column-form');
            var $addInput = $('<input>').addClass('column-input').attr('placeholder', 'type your task here');
            var $addCardButton = $('<button>').addClass('add-card').text('+');
            var $deleteColumnButton = $('<button>').addClass('column-delete-button').text('x');
            //************************************************ Event handlers******************************************************
            $deleteColumnButton.click(function() {
                self.removeColumn();
            });
            $columnForm.submit(function(e) {
                e.preventDefault();
            });
            $addInput.focus(function(e) {
                $(e.target).parent().addClass('focused');
                $(e.target).attr('placeholder', '');
            });
            $addInput.focusout(function(e) {
                $(e.target).parent().removeClass('focused');
                $(e.target).attr('placeholder', 'type your task here');
            });
            $addInput.keydown(function(e) {
                if (e.keyCode === 13) {
                    self.addCard(new Card($(e.target).val()));
                    $(e.target).val('');
                    e.preventDefault();
                }
            });
            $addCardButton.click(function(e) {
                self.addCard(new Card($(e.target).prev().val()));
                $(e.target).prev().val('');
            });
            // ****************************************************Appending to column******************************************************
            $columnForm.append($addInput).append($addCardButton);
            $column.append($columnTitle).append($columnForm).append($deleteColumnButton).append($columnCardList);
            return $column;
        },
        removeColumn: function() {
            var self = this;
            this.$element.fadeOut('fast', function() {
                self.$element.remove();
            });
        },
        addCard: function(card) {
            this.$element.children('.column-card-list').append(card.$element);
            $(card.$element).jAnimateOnce('fadeInUp');
        },
        initSortable: function() {
            $('.column-card-list').sortable({
                connectWith: '.column-card-list',
            }).disableSelection();
        }
    };
    //*********************************************CARD CLASS*********************************************************
    function Card(description) {
        this.description = description;
        this.id = randomString();
        this.$element = this.createCard();
    }
    Card.prototype = {
        createCard: function() {
            var self = this;
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(this.description);
            var $cardDelete = $('<button>').addClass('card-delete-button').text('x');
            $cardDelete.click(function() {
                self.removeCard();
            });
            $card.append($cardDelete).append($cardDescription);
            return $card;
        },
        removeCard: function() {
            var self = this;
            this.$element.fadeOut('fast', function() {
                self.$element.remove();
            });
        }
    };
    //*****************************************Board CLASS*************************************
    function Board(name) {
        this.name = name;
        this.id = randomString();
        this.$element = this.createBoard();
    }
    Board.prototype = {
        createBoard: function() {
            var self = this;
            var $board = $('<div>').addClass('board');
            var $boardHeader = $('<div>').addClass('board-header');
            var $boardForm = $('<form>').addClass('board-form');
            var $addColumnInput = $('<input>').addClass('add-column-input').attr('placeholder', 'type column name');
            var $boardDescription = $('<h1>').addClass('board-description').text(this.name);
            var $addColumnButton = $('<button>').addClass('add-column-button').text('+');
            var $removeBoardButton = $('<button>').addClass('remove-board-button').text('x');
            var $columnContainer = $('<div>').addClass('column-container');
            $boardForm.submit(function(e) {
                e.preventDefault();
            });
            $addColumnInput.focus(function(e) {
                $(e.target).parent().addClass('focused');
                $(e.target).attr('placeholder', '');
            });
            $addColumnInput.focusout(function(e) {
                $(e.target).parent().removeClass('focused');
                $(e.target).attr('placeholder', 'type column name');
            });
            $addColumnInput.keydown(function(e) {
                if (e.keyCode === 13) {
                    self.addColumn(new Column($(e.target).val()));
                    $(e.target).val('');
                    e.preventDefault();
                }
            });
            $removeBoardButton.click(function() {
                self.removeBoard();
            });
            $addColumnButton.click(function(e) {
                self.addColumn(new Column($(e.target).prev().val()));
            });
            $boardForm.append($addColumnInput).append($addColumnButton);
            $boardHeader.append($boardDescription).append($removeBoardButton);
            $board.append($boardHeader).append($boardForm).append($columnContainer);
            return $board;
        },
        removeBoard: function() {
            var self = this;
            this.$element.fadeOut('fast', function() {
                self.$element.remove();
            });
        },
        addColumn: function(column) {
            this.$element.children('.column-container').append(column.$element);
            column.initSortable();
            $(column.$element).jAnimateOnce('fadeInUp');
        }
    };
    $('#add-board').click(function(e) {
        var newBoard = new Board(prompt('Enter board name: '));
        newBoard.$element.insertAfter(e.target);
        newBoard.$element.children('.board-header').jAnimateOnce('fadeInUp');
        newBoard.$element.children('.board-form').jAnimateOnce('fadeInUp');

    });
    $('main').append(board.$element);
});