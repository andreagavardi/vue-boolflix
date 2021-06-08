 const app = new Vue ({ 
    el: '#app',
    data:{
        API_key:"ee51577542fc46315161e476972d3102",
        url:"https://api.themoviedb.org/3/",
        linkMovies:"search/movie",
        linkTvShow:"search/tv",
        query:null,
        films:null,
        tvShows:null,
        ImgUrl:"https://www.countryflags.io/"
     },
    methods:{   
        cercaFilm(){
            axios
            .get(this.url+this.linkMovies+"?api_key="+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=null){
                    this.films=resp.data.results
                    console.log(this.films);
                    
                }
            });
            axios
            .get(this.url+this.linkTvShow+"?api_key="+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=null){
                    this.tvShows=resp.data.results
                    console.log(this.tvShows);
                    
                }
            });
            
        }
     },
    mounted(){

       
    } 
}) 
