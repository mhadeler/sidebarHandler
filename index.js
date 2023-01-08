const handleWidth = 30;    
const sidebarWidth = 350;  
document.querySelector('div#mainBody').style = `
  --handleWidth: ${handleWidth}px;
  --sidebarWidth: ${sidebarWidth}px;
`;

const sidebarHandle = document.querySelector('div#sidebarHandle');

const handleDoubleClick = (e) => {
  const sideBar = document.querySelector('div#sidebar');
  let newBasis;
  if (sideBar.classList.contains('closed') || parseInt(sideBar.style.flexBasis.split('px')[0]) < 50) {
    newBasis = handleWidth + sidebarWidth;
    sideBar.classList.remove('closed');
  } else {
    newBasis = handleWidth;
    sideBar.classList.add('closed');
  }
  sideBar.style.flexBasis = `${newBasis}px`;       
}        

const handleMouseDown = (e) => {
  const startX = e.clientX;
  const sideBar = e.target.closest('div#sidebar');
  sideBar.classList.add('resizing');
  const startBasis = sideBar.style.flexBasis ? parseInt(sideBar.style.flexBasis.split('px')[0]):handleWidth+sidebarWidth;

  const handleMouseMove = (e) => {
    const newX = e.clientX;
    const change = newX - startX;
    let newBasis = startBasis + change;
    if (newBasis < handleWidth) {
      newBasis = handleWidth;
      sideBar.classList.add('closed');                 
    } else if (sideBar.classList.contains('closed')) { 
      sideBar.classList.remove('closed');
      sideBar.classList.add('visible');
    }
    sideBar.style.flexBasis = `${newBasis}px`;            
  }

  const handleMouseUp = (e) => {
    document.onmousemove = null;
    document.onmouseup = null;
    sideBar.classList.remove('resizing');
  }

  document.onmousemove = handleMouseMove;
  document.onmouseup = handleMouseUp;
}

sidebarHandle.addEventListener('mousedown', handleMouseDown);
sidebarHandle.addEventListener('dblclick', handleDoubleClick);  

function hideSidebar(e) {
  const sideBar = document.querySelector('div#sidebar');
  sidebar.classList.toggle('hidden');
  sidebar.classList.toggle('visible');
}
