const editbtns = document.getElementsByClassName("editbtn");
const deletebtns = document.getElementsByClassName("deletebtn");
const update = document.querySelector('#updatebtn')

for(var i = 0; i < editbtns.length; i++) {
    editbtns[i].addEventListener('click', (event) => {
        console.log('clicked')

        var targetElement = event.target || event.srcElement;
        console.log(targetElement.dataset.id)
        document.querySelector('input#id').value = targetElement.dataset.id
        document.querySelector('input#nim').value = targetElement.dataset.nim
        document.querySelector('input#nama').value = targetElement.dataset.nama
    })
}

for(var i = 0; i < deletebtns.length; i++) {
    deletebtns[i].addEventListener('click', (event) => {
        var targetElement = event.target || event.srcElement;

        fetch('/mahasiswa', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: targetElement.dataset.id
            })
        }).then(res => {
            if(res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
    })
}

update.addEventListener('click', _ => {
    var id = document.querySelector('#id').value
    var nim = document.querySelector('#nim').value
    var nama = document.querySelector('#nama').value
    // Send PUT Request here
    fetch('/mahasiswa', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            nim: nim,
            nama: nama
        })
    }).then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})