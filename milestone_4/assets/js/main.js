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
        emptyFilms:"",
        tvShows:"",
        emptyTvShows:"",
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
                    this.films=resp.data.results;
                    this.emptyFilms="";
                    this.error=null
                    /* console.log(this.films); */
                   
                }
                if(this.films.length==0){
                    this.emptyFilms='La ricerca: "' + this.query +'" non ha prodotto nessun risultato' 
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
                    this.emptyTvShows="";
                    this.error_2=null

                    
                }
                if(this.tvShows.length==0){
                    this.emptyTvShows='La ricerca: "' + this.query +'" non ha prodotto nessun risultato'
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
