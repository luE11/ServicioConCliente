$( document ).ready(function() {
    
    $("#btnReg").click(function(){
        var iNombre = $("#nombre").val()
        var iEdad = $("#edad").val()
        if(iNombre && iEdad){
            console.log(iNombre+" "+iEdad)
            $.post("http://localhost:3000/plantas",
                {nombre: iNombre, edad: iEdad}, 
                function(datos){
                    $("#nombre").val('')
                    $("#edad").val('')
                    $("#info").css('color', 'green')
                    $("#info").text(datos) 
                }
            )   
        }else {
            $("#info").css('color', 'red')
            $("#info").text('Parametros insuficientes') 
        }  
        return false
    });

    $("#btnDel").click(function(){
        $.ajax({
            type:"DELETE", 
            url:"http://localhost:3000/plantas", 
            success:function(datos){
                if(datos==='Lista de plantas eliminada'){
                    $("#info").css('color', 'green') 
                }else{
                    $("#info").css('color', 'red')
                }
                $("#info").text(datos) 
            }       
        })       
    })

    $("#btnShow").click(function(){
        $.get("http://localhost:3000/plantas", 
                function(datos){
                    $('#register').empty()
                    if(Array.isArray(datos)){
                        var data = '<tr><td> Nombre </td><td> Edad </td></tr>';
                        for (let i = 0; i < datos.length; i++) {
                            data+='<tr><td>' + datos[i].nombre + '</td><td>' + datos[i].edad + '</td></tr>';                      
                        }
                        $('#register').append(data); 
                    }else{
                        $("#info").css('color', 'red')
                        $("#info").text(datos) 
                    }
                                       
                }
            )       
    })

})