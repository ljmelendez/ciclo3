home = {
    urlbase: 'http://127.0.0.1:8080', 
    uSuperAdmin: 1,
    uAdmin: 2,
    uCliente: 3,
    ref: null
}
urlRest = {
    urlgetproductos: home.urlbase + '/productos',
    urlconnect: home.urlbase + '/connect',
    urlgetlistadeseos: home.urlbase + '/listadeseos'
}

servicios = {
    getproductos: function(){
        $.ajax({
            type: "GET",
            url: urlRest.urlgetproductos,
            async: true,
            dataType: "json",
            success: function(data){

                for(var i=0; i<data.length; i++){

                    newProducto = 
                    '       <div id="carousel-example-generic'+i+'" class="carousel slide col-md-2" data-ride="carousel" data-interval="false">'+
                    '		<h4>'+data[i].Nombre+'</h4> '+
                    '		<span>Agregar a la lista de deseos</span>'+
                    '		'+
                    '		<ol class="carousel-indicators">'+
                    '			<li data-target="#carousel-example-generic'+i+'" data-slide-to="0" class="active"></li>'+
                    '			<li data-target="#carousel-example-generic'+i+'" data-slide-to="1"></li>'+
                    '			<li data-target="#carousel-example-generic'+i+'" data-slide-to="2"></li>'+
                    '		</ol>'+
                    '		    <div class="carousel-inner" role="listbox">';

                    for (var j = 0; j<data[i].Imagenes.length; j++) {

                        newProducto +=  '			    <div class="item '+ (j==0 ? "active" : "")+ '">'+
                                        '			        <img src="'+data[i].Imagenes[j]+'" alt="...">'+
                                        '			        <div class="carousel-caption"></div>'+
                                        '			    </div>';							                                        
                    }
                    
                    newProducto +=
                    '		    </div>'+
                    
                    '		'+
                    '		<a class="left carousel-control" href="#carousel-example-generic'+i+'" role="button" data-slide="prev">'+
                    '			<span class="glyphicon glyphicon-chevron-left icon-prev" aria-hidden="true"></span>'+
                    '			<span class="sr-only">Previous</span>'+
                    '		</a>'+
                    '		<a class="right carousel-control" href="#carousel-example-generic'+i+'" role="button" data-slide="next">'+
                    '			<span class="glyphicon glyphicon-chevron-right icon-next" aria-hidden="true"></span>'+
                    '			<span class="sr-only">Next</span>'+
                    '    	</a>'+
                    '		<form>'+
                    '			<p class="clasificacion">'+
                    '			  <input id="radio1" type="radio" name="estrellas" value="5">'+
                    '			  <label for="radio1">★</label>'+
                    '			  <input id="radio2" type="radio" name="estrellas" value="4">'+
                    '			  <label for="radio2">★</label>'+
                    '			  <input id="radio3" type="radio" name="estrellas" value="3">'+
                    '			  <label for="radio3" class="votado">★</label>'+
                    '			  <input id="radio4" type="radio" name="estrellas" value="2">'+
                    '			  <label for="radio4" class="votado">★</label>'+
                    '			  <input id="radio5" type="radio" name="estrellas" value="1">'+
                    '			  <label for="radio5" class="votado">★</label>'+
                    '			</p>'+
                    '		  </form>'+
                    '		<span class="s-precio">$ '+data[i].Precio+'</span>'+
                    '		<a href="#" class="s-producto-comentarios">'+data[i].Comentarios+' comentarios</a>'+
                    '       <div class="btn-del-edit-prod"><a href="#" class="btn-editar">Editar</a> <a href="#" class="btn-eliminar">Eliminar</a></div>'+
                    '	</div>';

                    $("#list-productos").append(newProducto);
                }
            },
            error: function(e){
                    
            },
        });
    },

    getconnect: function(){
        $.ajax({
            type: "GET",
            url: urlRest.urlconnect,
            async: true,
            dataType: "json",
            success: function(data){
                debugger
                home.ref = data.ref;
                if(data.tipoUser == home.uSuperAdmin)
                 $("#crear-producto").show();

            },
            error: function(e){
                    
            },
        });
    }
}