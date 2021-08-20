const host = "http://192.168.0.140/api";
const endPoint = host + "/Jogo";

function create(model){
    let request = new XMLHttpRequest();
    request.open('POST', endPoint);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(model));
    request.onload = function(){
        console.log(request.status);
    }
}

function listAll(){
    let request = new XMLHttpRequest();
    request.open('GET', endPoint);
    request.send();
    request.onload = function (){
        console.log(request.status);
        let list = JSON.parse(this.responseText);
        carrega_tabela(list);
    }
}

function read_by_id(id){
    let request = new XMLHttpRequest();
    request.open('GET', endPoint+'/'+id);
    request.send();
    request.onload = function (){
        console.log(request.status);
        carrega_form( JSON.parse(this.responseText));
    }
}
function update(model){
    let request = new XMLHttpRequest();
    request.open('PUT', endPoint+'/'+model.id);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(model));
    request.onload = function(){
        console.log(request.status);
    }
}

function del(id){    
    let request = new XMLHttpRequest();
    request.open('DELETE', endPoint+'/'+id);
    request.send();
    request.onload = function(){
        console.log(request.status);
        window.location = 'index.html';
    }
}


function carrega_tabela(list){   
    console.log(list) 
    let table = document.getElementById("tableJogo");
    let body = table.getElementsByTagName("tbody")[0];
    body.innerHTML = "";
    list.forEach(e => {

        let line = `<tr>
                        <td>${e.id}</td>
                        <td>${e.nome}</td>
                        <td>${e.descricao}</td>
                        <td>${e.lancamento}</td>
                        <td><a href="edit.html?id=${e.id}">Editar</a></td>
                        <td><a onclick="del(${e.id})">Deletar</a></td>
                    </tr>`;
        body.innerHTML += line;
    });
}

function cadastrar(){
    let name = document.getElementById("name").value;
    let desc = document.getElementById("desc").value;
    let release = document.getElementById("release").value;
    let model = {"nome":name, "descricao":desc, "lancamento":release};
    create(model);
}

function carrega_form(model){
    document.getElementById("id").value = model.id;
    document.getElementById("name").value = model.nome;
    document.getElementById("desc").value = model.descricao;
    document.getElementById("release").value = model.lancamento;
}

function editar(){
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let desc = document.getElementById("desc").value;
    let release = document.getElementById("release").value;
    let model = {"id":id,"nome":name, "descricao":desc, "lancamento":release};
    update(model);
}