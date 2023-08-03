'use strict';

const zona = document.querySelector('.zona-arrastre');
const barra = document.querySelector('.barra-carga');

zona.addEventListener('dragover', e => {
  e.preventDefault();
  changeStyle(e.srcElement, '#444')
});

zona.addEventListener('dragleave', e => {
  e.preventDefault();
  changeStyle(e.srcElement, '#888')
});

zona.addEventListener('drop', e => {
  e.preventDefault();
  cargarArchivo(e.dataTransfer.files[0]);
});

const changeStyle = (obj, color) => {
  obj.style.color = color;
  obj.style.border = `3px dashed ${color}`;
}

const cargarArchivo = file => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.addEventListener('loadstart', () => {
    zona.style.border = '3px solid #888';
    barra.style.padding = `75px 20px`;
  })

  reader.addEventListener('progress', e => {
    let carga = (e.loaded / file.size) * 100;
    zona.textContent = ` espere un momento...`;
    barra.style.width = `${carga}%`;
  });

  reader.addEventListener('load', e => {
    let video = new Blob([new Uint8Array(e.currentTarget.result)], { type: 'video/mp4' });
    let url = URL.createObjectURL(video);
    let img = document.createElement('video');
    img.setAttribute('src', url);
    document.querySelector('.resultado').appendChild(img);
  });

  reader.addEventListener('loadend', () => {
    barra.style.width = `0`;
    barra.style.padding = '0';
    barra.style.background = '#def';
    zona.textContent = `!completado¡`;
    zona.style.color = '#1c992a';
    zona.style.background = '#dfe';
    setTimeout(() => {
      zona.textContent = `Arrastre un archivo en esta zona`;
      zona.style.border = '3px dashed #888';
      zona.style.color = '#888'
      zona.style.background = 'transparent';
    }, 500);
  });
}