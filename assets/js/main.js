 const app = new Vue ({ 
    el: '#app',
    data:{
        url:"https://api.themoviedb.org/3/search/movie?api_key=ee51577542fc46315161e476972d3102&language=it-IT&query=",
        query:null
     },
    methods:{   
        cercaFilm(){
             axios
            .get(this.url+this.query)
            .then(resp=>{
                if(this.query!=null){

                    console.log(resp.data.results);
                }
            })
        }
     },
    mounted(){

       
    } 
}) 
