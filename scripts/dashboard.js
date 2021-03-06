var aplicacion = new Vue({
    el: "#app",
    data: {
        categorias: [],
        productos: [],
        productos_de_pedidos: [],
        productos_mas_vendidos: [],
        pedidos: [],
        usuarioLogeado: [],
        usuarios: [],
        puestos: [],
        listaPedidos: [],
        nombreProducto:"",
        precioProducto:0,
        fotoProducto:"",
        categoriaProducto:0,
        jefe:0,
        nombreUsuario:"",
        avatarUsuario:"",
        contrasenyaUsuario:"",
        confirmcontrasenyaUsuario:"",
        emailUsuario:"",
        puestoNombre:"",
        nombreCategoria:"",
        filtro:"",
        idUsuario:"",
        idProducto:"",
        idCategoria:"",
        idPuesto:""

    },
    async mounted() {

        this.obtenerUsuarioLogeado()
        this.obtenerProductosMasVendidos()

    },
    methods: {
        /* Metodos HTTP */
        obtenerProductos() {
            axios.get(localStorage.getItem('URL_API') + 'productos',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.productos = response.data.data))
        },
        obtenerCategorias() {
            axios.get(localStorage.getItem('URL_API') + 'categorias',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.categorias = response.data.data))
        },
        obtenerPuestos() {
            axios.get(localStorage.getItem('URL_API') + 'puestos',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.puestos = response.data.data))
        },
        obtenerUsuarioLogeado() {
            axios.get(localStorage.getItem('URL_API') + 'userlogged',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.usuarioLogeado = response.data))
        },
        obtenerUsuarios() {
            axios.get(localStorage.getItem('URL_API') + 'users',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.usuarios = response.data))
        },
        obtenerPedidos() {
            axios.get(localStorage.getItem('URL_API') + 'pedidos',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.pedidos = response.data))
        },
        obtenerProductosDePedidos() {
            axios.get(localStorage.getItem('URL_API') + 'productosdepedidos',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.productos_de_pedidos = response.data))
        },
        obtenerProductosMasVendidos() {
            axios.get(localStorage.getItem('URL_API') + 'productosmasvendidos',
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (this.productos_mas_vendidos = response.data))
        },
        obtenerProductosPorCategoria(categoria) {
            axios.post(localStorage.getItem('URL_API') + 'findproductobycategoria',
                /* Aqui va el contenido a enviar en el POST */
                { "id": categoria },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    this.productos = response.data
                })
                .catch(() => {
                    console.log(response)
                })
        },
        crearPedido() {
            axios.post(localStorage.getItem('URL_API') + 'pedidos',
                /* Aqui va el contenido a enviar en el POST */
                {
                    "usuario": this.usuarios.id,
                    "puesto": this.puestoElegido.id,
                    "ingreso": this.precioPedidoTotal,
                    "fecha_pedido": "2020-05-15"
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    this.pedidoActual = response.data.data.id
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },
        crearProducto(){

            if (this.fotoProducto == "") {
                this.fotoProducto = "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-260nw-1350441335.jpg";
            }

            axios.post(localStorage.getItem('URL_API') + 'productos',
                /* Aqui va el contenido a enviar en el POST */
                {
                    "nombre": this.nombreProducto,
                    "precio": this.precioProducto,
                    "foto": this.fotoProducto,
                    "categoria": this.categoriaProducto
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },
        crearUsuario() {
            if (this.avatarUsuario == "") {
                this.avatarUsuario = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/1200px-Microsoft_Account.svg.png";
            }
          
            axios.post(localStorage.getItem('URL_API')+'registrarse', {
                name:this.nombreUsuario,
                email: this.emailUsuario,
                password: this.contrasenyaUsuario,
                password_confirmation: this.confirmcontrasenyaUsuario,
                jefe:this.jefe,
                avatar:this.avatarUsuario
            })
                .then(response => {
                    console.log(response)
                    console.log("registrado!")
                })
                .catch(error => {
                    console.log(error.response)

                });
        },
        crearPuesto(){
            axios.post(localStorage.getItem('URL_API') + 'puestos',
                /* Aqui va el contenido a enviar en el POST */
                {
                    "nombre": this.puestoNombre,
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },
        crearCategoria(){
            axios.post(localStorage.getItem('URL_API') + 'categorias',
                /* Aqui va el contenido a enviar en el POST */
                {
                    "nombre": this.nombreCategoria,
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },
        obtenerUsuario(idUsuario) {
            this.idUsuario = idUsuario;
            axios.get(localStorage.getItem('URL_API') + 'users/'+idUsuario,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    this.emailUsuario = response.data.data.email,
                    this.nombreUsuario = response.data.data.name,
                    this.jefe = response.data.data.jefe,
                    this.avatarUsuario = response.data.data.avatar
                    ))
                
        },
        editarUsuario(){
            axios.put(localStorage.getItem('URL_API') + 'users/'+this.idUsuario,
                /* Aqui va el contenido a enviar en el POST */
                {
                    "name": this.nombreUsuario,
                    "email":this.emailUsuario,
                    "jefe":  this.jefe,
                    "avatar":this.avatarUsuario,
                   /*  "password":this.contrasenyaUsuario,    */                 
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },
        eliminarUsuario(idUsuario) {
            if (confirm("Estas seguro que deseas eliminar el usuario?")) {
                axios.delete(localStorage.getItem('URL_API') + 'users/'+idUsuario,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    console.log(response)
                    ))
            }
           
        },
        obtenerProducto(idProducto) {
            this.idProducto = idProducto;
            axios.get(localStorage.getItem('URL_API') + 'productos/'+idProducto,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    console.log(response),
                    this.nombreProducto = response.data.data.nombre,
                    this.precioProducto = response.data.data.precio,
                    this.fotoProducto = response.data.data.foto
                    ))
                
        },
        editarProducto(){
            axios.put(localStorage.getItem('URL_API') + 'productos/'+this.idProducto,
                /* Aqui va el contenido a enviar en el POST */
                {
                    "nombre": this.nombreProducto,
                    "precio":this.precioProducto,
                    "foto":  this.fotoProducto,
                    "categoria":this.categoriaProducto,               
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },

        eliminarProducto(idProducto) {
            if (confirm("Estas seguro que deseas eliminar el producto?")) {
                axios.delete(localStorage.getItem('URL_API') + 'productos/'+idProducto,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    console.log(response)
                    ))
            }
           
        },
        obtenerCategoria(idCategoria) {
            this.idCategoria = idCategoria;
            axios.get(localStorage.getItem('URL_API') + 'categorias/'+idCategoria,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    console.log(response),
                    this.nombreCategoria = response.data.data.nombre
                    ))
                
        },
        editarCategoria(){
            axios.put(localStorage.getItem('URL_API') + 'categorias/'+this.idCategoria,
                /* Aqui va el contenido a enviar en el POST */
                {
                    "nombre": this.nombreCategoria,           
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },

        eliminarCategoria(idCategoria) {
            if (confirm("Estas seguro que deseas eliminar la categoria?")) {
                axios.delete(localStorage.getItem('URL_API') + 'categorias/'+idCategoria,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    console.log(response)
                    ))
            }
           
        },
        obtenerPuesto(idPuesto) {
            this.idPuesto = idPuesto;
            axios.get(localStorage.getItem('URL_API') + 'puestos/'+idPuesto,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    this.puestoNombre = response.data.data.nombre
                    ))
        },
        editarPuesto(){
            axios.put(localStorage.getItem('URL_API') + 'puestos/'+this.idPuesto,
                /* Aqui va el contenido a enviar en el POST */
                {
                    "nombre": this.puestoNombre,           
                },
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => {
                    console.log(response)
                })
                .catch(() => {
                    console.log(response)
                })
        },
        eliminarPuesto(idPuesto) {
            console.log(idPuesto)
            if (confirm("Estas seguro que deseas eliminar el puesto?")) {
                axios.delete(localStorage.getItem('URL_API') + 'puestos/'+idPuesto,
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
                .then(response => (
                    console.log(response)
                    ))
            }
           
        },



        /* Metodos para dar funcionalidad */

        mostrarUsuarios() {
            this.obtenerUsuarios()

            $(".divTablas").hide();

            $(".divUsuarios").show();

        },
        mostrarProductos() {
            this.obtenerProductos()
            this.obtenerCategorias()
            $(".divTablas").hide();

            $(".divProductos").show();
        },

        mostrarCategorias() {
            this.obtenerCategorias()

            $(".divTablas").hide();

            $(".divCategorias").show();

        },
        mostrarPuestos() {
            this.obtenerPuestos()

            $(".divTablas").hide();

            $(".divPuestos").show();

        },
        mostrarPedidos() {
            this.obtenerPedidos()

            $(".divTablas").hide();

            $(".divPedidos").show();

        },
        mostrarProductosDePedidos() {
            this.obtenerProductosDePedidos()

            $(".divTablas").hide();

            $(".divProductosDePedidos").show();
        },

        cerrarSesion(){
            localStorage.removeItem("access_token");
            window.location.href = '../index.html';
        },


        /* Metodos Navbar */

        mostrarHome() {
            $(".mostrarOpcionesTablas").hide();
            $(".divTablas").hide();
            $(".mostrarHome").show();
            $(".nav-item").removeClass('active');
            $("#navHome").addClass('active');


        },
        mostrarTablas() {
            $(".mostrarOpcionesTablas").hide();
            $(".mostrarTablas").show();
            $(".nav-item").removeClass('active');
            $("#navTablas").addClass('active');

        },
        mostrarGraficos() {
            $(".mostrarOpcionesTablas").hide();
            $(".divTablas").hide();
            $(".mostrarGrafico").show();
            $(".nav-item").removeClass('active');
            $("#navGraficos").addClass('active');

            var labels = [];
            var data = [];
            this.productos_mas_vendidos.forEach(labelName => {
                labels.push(labelName.nombre)
                data.push(labelName.unidades_vendidas)
            });

            this.showChart(labels,data);
        },

        /* Metodo para el grafico */

        showChart(datosLabels,datosData) {
            
            var oilCanvas = document.getElementById("oilChart");

            Chart.defaults.global.defaultFontFamily = "Lato";
            Chart.defaults.global.defaultFontSize = 18;

            var oilData = {
                labels : datosLabels,
                datasets: [
                    {
                        data : datosData,
                        backgroundColor: [
                            "#FF6384",
                            "#63FF84",
                            "#84FF63",
                            "#8463FF",
                            "#6384FF",
                            "#46f66d",
                            "#d1e804",
                            "#1c4190",
                            "#30c9c0"
                        ]
                    }]
            };
            
            var pieChart = new Chart(oilCanvas, {
                type: 'pie',
                data: oilData
            });
        },
        filtroTabla() {
            var value = this.filtro;
			$('table tr:not(:first-child)').each(function () {
				var found = 'false';
				var valor = value.toLowerCase();
				$(this).each(function () {
					if ($(this).text().toLowerCase().indexOf(valor) >= 0) {
						found = 'true';
					}
				});
				if (found == 'true') {
					$(this).show();
				}
				else {
					$(this).hide();
				}
            });
            this.filtro=""
		}




    },


});