 const app = new Vue ({ 
    el: '#app',
    data:{
        API_key:"ee51577542fc46315161e476972d3102",
        url:"https://api.themoviedb.org/3/search/movie?api_key=",
        query:null,
        films:null,
        ImgUrl:"https://www.countryflags.io/"
     },
    methods:{   
        cercaFilm(){
            axios
            .get(this.url+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=null){
                    this.films=resp.data.results
                    console.log(this.films);
                    
                }
            });
            
        }
     },
    mounted(){

       
    } 
}) 
