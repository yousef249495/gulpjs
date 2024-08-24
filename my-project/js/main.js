function bg() {
    [...document.body.children].forEach(ele => {
        ele.style.backgroundColor = '#000'
        ele.style.margin = '10px'
        ele.style.padding = '10px'
    });
}
document.body.style.color = '#ccc'
bg() 