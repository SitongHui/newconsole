window.onload = function () {
    new Console();
};

const msgType = {
    LOG : 'log',
    INFO : 'info',
    WARN : 'warn',
    ERROR : 'error'
}

const $ = document.querySelectorAll.bind(document);

function Console() {
    this.consoleEle = $('.console-area')[0];
    this.consoleBtnEle = $('.showbtn')[0];
    this.consoleShowStatus = false;

    this.initEvent();
    this.bindConsole();
}

Console.prototype.initEvent = function () {
    this.consoleBtnEle.addEventListener('click', () => {
        this.consoleShowStatus = !this.consoleShowStatus;
        if(this.consoleShowStatus){
            this.consoleEle.style.display = 'block';
        }else{
            this.consoleEle.style.display = 'none';
        }
    },false)
}

Console.prototype.bindConsole = function () {
    originfunc(msgType.LOG, 'LOG');
    originfunc(msgType.ERROR, 'ERROR');
    originfunc(msgType.INFO, 'INFO');
    originfunc(msgType.WARN, 'WARN');

    function originfunc(a,b) {
        var consoleWay = ['info','error','log','warn'];
        for(var i = 0; i < consoleWay.length; i++) {
            var way = consoleWay[i];
            var originType = console[way]; //保存原方法
        }
        console[a] = function (message) {
            appendMessage(new Message(message, msgType[b]));
            originType(message);
        }
    }
}




function appendMessage(message) {
    $('.console-area')[0].appendChild(message.toHtml());
}

function Message(content,type) {
    this.type = type;
    this.content = content;
}
Message.prototype.toHtml = function () {
        const p = document.createElement('p');
        p.innerHTML = this.content;
        p.className = this.type;
        return p;
    }