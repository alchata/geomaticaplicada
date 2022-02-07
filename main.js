//Service Worker

if('serviceWorker' in navigator){
    console.log('Puedes usar el Service Worker en tu Navegador');

    navigator.serviceWorker.register('./sw.js')
                    .then(res => console.log('Service Worker Cargado correctamente', res))
                    .catch(err => console.log('Service Worker no se ha podido registrar',err));

}else{
    console.log('NO Puedes usar el Service Worker en tu Navegador');
}



/*JavaScript para suavizado del Scroll al hacer click sobre los href*/
//scrol suavizado
$(document).ready(function(){
    /*alert("Proceso Ok");*/
    $("#menu a").click(function(e){
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });        

        return false;
    });
});