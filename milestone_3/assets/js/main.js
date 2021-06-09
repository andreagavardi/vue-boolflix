 const app = new Vue ({ 
    el: '#app',
    data:{
        API_key:"ee51577542fc46315161e476972d3102",
        url:"https://api.themoviedb.org/3/",
        linkMovies:"search/movie",
        linkTvShow:"search/tv",
        error:null,
        error_2:null,
        query:"",
        films:"",
        tvShows:"",
        ImgUrl:"https://www.unknown.nu/flags/images/",
        posterUrl:"https://image.tmdb.org/t/p/w342"
        
     },
    methods:{   
        getRatings:function(obj){
                return Math.round(obj / 2);
            
            },
        cercaFilm(){
            /* ricerca movies */
            axios
            .get(this.url+this.linkMovies+"?api_key="+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=""){
                    this.films=resp.data.results
                    /* console.log(this.films); */
                   
                }
            })
            .catch(error=>{
                console.error(error);
                this.error='OOOPS QUALCOSA È ANDATO STORTO: ' +error;
            });
            axios
            .get(this.url+this.linkTvShow+"?api_key="+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=null){
                    this.tvShows=resp.data.results
                    console.log(this.tvShows);
                    
                }
            })
            .catch(error=>{
                console.error(error);
                this.error_2='OOOPS QUALCOSA È ANDATO STORTO: ' +error;
            });
            
        }
     },
    mounted(){
        
       
        
       
    } 
}) 
