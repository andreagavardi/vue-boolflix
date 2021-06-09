 const app = new Vue ({ 
    el: '#app',
    data:{
        API_key:"ee51577542fc46315161e476972d3102",
        url:"https://api.themoviedb.org/3/",
        linkMovies:"search/movie",
        linkTvShow:"search/tv",
        error:null,
        query:"",
        films:"",
        tvShows:"",
        ImgUrl:"https://www.unknown.nu/flags/images/",/* https://www.countryflags.io/ */
        
     },
    methods:{   
        getRatings:function(obj){
                console.log(obj/2);
                return Math.round(obj / 2);
            
            },
        cercaFilm(){
            axios
            .get(this.url+this.linkMovies+"?api_key="+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=""){
                    this.films=resp.data.results
                   /*  console.log(this.films); */
                   
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
                    /* console.log(this.tvShows); */
                    
                }
            });
            
        }
     },
    mounted(){
        
       
        
       
    } 
}) 
