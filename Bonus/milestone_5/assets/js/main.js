 const app = new Vue ({ 
    el: '#app',
    data:{
        popularMovies:"",
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
        getRatings:function(vote){  //metodo a cui passo la proprietà "vote_average" che poi divido per 2 
                return Math.round(vote / 2); //(per avere il massimo di 5) e lo arrotondo
            
            },

        /* funzione della barra di ricerca */
        ricerca(){
            /* ricerca movies */
            axios
            .get(this.url+this.linkMovies+"?api_key="+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=""){
                    this.films=resp.data.results;
                    this.emptyFilms=""; //azzero i vari errori così da non mostrarli nella nuova ricerca
                    this.error=null
                    /* console.log(this.films); */
                   
                   
                }
                if(this.films.length==0){ //se la ricerca non ha risultati
                    this.emptyFilms='La ricerca: "' + this.query +'" non ha prodotto nessun risultato' 
                }
            })
            .catch(error=>{
                console.error(error);
                this.error='OOOPS QUALCOSA È ANDATO STORTO: ' +error;
            })
            .finally(resp=>{      
                /* ricerca casting dei singoli film */   
                this.ricercaCasting(this.films);      
                
            });
            /*END ricerca movies */

            /* ricerca Tv Series */
            axios
            .get(this.url+this.linkTvShow+"?api_key="+this.API_key+"&language=it-IT&query="+this.query)
            .then(resp=>{
                if(this.query!=null){
                    this.tvShows=resp.data.results
                    /* console.log(this.tvShows); */
                    this.emptyTvShows=""; //azzero i vari errori così da non mostrarli nella nuova ricerca
                    this.error_2=null                    
                }
                if(this.tvShows.length==0){ //se la ricerca non ha risultati
                    this.emptyTvShows='La ricerca: "' + this.query +'" non ha prodotto nessun risultato'
                }
            })
            .catch(error=>{
                console.error(error);
                this.error_2='OOOPS QUALCOSA È ANDATO STORTO: ' +error;
            })
            .finally(resp=>{
                this.ricercaCasting(this.tvShows);    
            });
            /*END ricerca Tv Series */
            
        },

        /* Ricerca Casting */
        ricercaCasting(lista){
            lista.forEach(film => {
                        console.log(film);
                        axios
                        .get(`${this.url}/movie/${film.id}/credits?api_key=${this.API_key}&language=it-IT`)
                        .then(resp=>{                            
                            this.$set(film,'casting',[]);
                            
                            for(let i=0; i < 5; i++){
                                if(resp.data.cast[i]!=undefined){
                                    film.casting.push(resp.data.cast[i].name)

                                }
                            }
                        })
                    });
        }
    },
    mounted(){
        /* Film Popolari Caricati al page landing per non lasciare la schermata vuota */
        axios
            .get("https://api.themoviedb.org/3/movie/popular?api_key=ee51577542fc46315161e476972d3102&language=it-IT")
            .then(resp=>{
                    /* console.log(resp.data.results); */
                    this.popularMovies=resp.data.results;
            })
            .catch(error=>{
                console.error('impossibile caricare i film popolari: '+error);
            })
            .finally(resp=>{
                this.ricercaCasting(this.popularMovies);    
            })
        
       
    } 
}) 
