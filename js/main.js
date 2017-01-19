/**
 * Created by chacal on 19/01/17.
 */

var list = [];

function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
}


function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + formatAmount(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-warning" onclick="setUpdate('+key+');">Edit</button> <button class="btn btn-danger" onclick="deleteData('+key+');">Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById('list-table').innerHTML = table;
    getTotal(list);
    savaListStorage(list);
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatAmount(amount) {
    return parseInt(amount);

}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2)+ "";
    str = str.replace(".",",");
    str = "$" + str;
    return str;
}

function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    if(desc === ""){
        errors += '<p>Fill out description</p>';
    }

    if(amount === ""){
        errors += '<p>Fill out a quantity</p>';
    }
    else if(amount != parseInt(amount)){
        errors += '<p>Fill out a valid amount</p>';
    }

    if(value === ""){
        errors += '<p>Fill out a value</p>';
    }
    else if(value != parseFloat(value)){
        errors += '<p>Fill out a valid value</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";
        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        document.getElementById("errors").style.display = "block";
        return 0;
    }
    return 1;
}

function addData() {
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc": desc,"amount": amount,"value": value});

    setList(list);
    resetForm();

}

function resetForm() {
    document.getElementById("desc").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("value").value = '';
    document.getElementById("btnUpdate").style.display= "none";
    document.getElementById("btnAdd").style.display= "inline-block";
    document.getElementById("inputIdUpdate").innerHTML = "";

}

function setUpdate(id) {

    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display= "inline-block";
    document.getElementById("btnAdd").style.display= "none";
    document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">'

}

function updateData() {
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    list[id] = {"desc": desc,"amount": amount,"value": value};
    resetForm();
    setList(list);
}

function deleteData(id) {

    if(confirm("Deseja realmente apagar o item?")){
        if(id === list.length -1){
            list.pop();
        }else
            if(id === 0){
                list.shift();
            }else{
                var arrayAuxIni = list.slice(0,id);
                var arrayAuxFim = list.slice(id + 1);
                list = arrayAuxIni.concat(arrayAuxFim);
            }
        setList(list);

    }
}
function deleteList() {

    if(confirm("Deseja realmente apagar a lista?")){
        list = [];
        setList(list);

    }
}

function savaListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

(function initListStorage() {
    var list = localStorage.getItem("list");
    if(list){
        setList(JSON.parse(list));
    }

})();
