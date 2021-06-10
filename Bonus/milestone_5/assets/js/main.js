 const app = new Vue ({ 
    el: '#app',
    data:{
        popularMovies:"",
        API_key:"ee51577542fc46315161e476972d3102",
        url:"https://api.themoviedb.org/3/",

        error:null,
        error_2:null,
        query:"",
        films:"",
        generiFilms:"",
        emptyFilms:"",
        tvShows:"",
        generiTvShows:"",
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
            let movies = "https://api.themoviedb.org/3/search/movie?api_key=ee51577542fc46315161e476972d3102&language=it-IT&query="+this.query;
            let serieTv ="https://api.themoviedb.org/3/search/tv?api_key=ee51577542fc46315161e476972d3102&language=it-IT&query="+this.query;

            const requestMovies = axios.get(movies);
            const requestSerieTv = axios.get(serieTv);
            axios.all([requestMovies,requestSerieTv])
            .then(
                axios.spread((...responses)=>{
                    const responseMovies = responses[0];
                    const responseSerieTv = responses[1];

                    /* ricerca movies */
                    this.films = responseMovies.data.results;
                    this.emptyFilms="";//azzero i vari errori così da non mostrarli nella nuova ricerca
                    this.error=null;
                    if(this.films.length==0){ //se la ricerca non ha risultati
                        this.emptyFilms='La ricerca: "' + this.query +'" non ha prodotto nessun risultato' 
                    }
                    this.ricercaCasting(this.films,"movie");
                    //console.log(this.films);

                    /* ricerca serieTv */
                    this.tvShows=responseSerieTv.data.results;
                    console.log(this.tvShows);
                    this.emptyTvShows=""; //azzero i vari errori così da non mostrarli nella nuova ricerca
                    this.error_2=null                    
                    if(this.tvShows.length==0){ //se la ricerca non ha risultati
                        this.emptyTvShows='La ricerca: "' + this.query +'" non ha prodotto nessun risultato'
                    }
                    this.ricercaCasting(this.tvShows,"tv"); 
                })
            )
            .catch(errors=>{
                console.error(errors);
                this.error='OOOPS QUALCOSA È ANDATO STORTO: ' +errors;
            })            
        },

        /* Ricerca Casting */
        ricercaCasting(lista,category){
            lista.forEach(film => {
                axios
                .get(`${this.url}${category}/${film.id}/credits?api_key=${this.API_key}&language=it-IT`)
                .then(resp=>{                            
                    this.$set(film,'casting',[]);
                    
                    for(let i=0; i < 5; i++){
                        if(resp.data.cast[i]!=undefined){
                            film.casting.push(resp.data.cast[i].name);
                        }
                    }
                })
            });
        },

    },
    mounted(){
        /* Film Popolari Caricati al page landing per non lasciare la schermata vuota */

        let popular="https://api.themoviedb.org/3/movie/popular?api_key=ee51577542fc46315161e476972d3102&language=it-IT";
        let generiFilm = "https://api.themoviedb.org/3/genre/movie/list?api_key=ee51577542fc46315161e476972d3102&language=it-IT"
        let generiTvShows="https://api.themoviedb.org/3/genre/tv/list?api_key=ee51577542fc46315161e476972d3102&language=it-IT"
        const requestPopular= axios.get(popular);
        const requestGeneriFilm = axios.get(generiFilm);
        const requestGeneriTvShows= axios.get(generiTvShows);
        axios.all([requestPopular,requestGeneriFilm,requestGeneriTvShows])
        .then(
            axios.spread((...responses)=>{
                const responsePopular = responses[0];
                const responseGeneriFilm = responses[1];
                const responseGeneriTvShows = responses[2];
                /* console.log(resp.data.results); */
                this.popularMovies=responsePopular.data.results;
                this.ricercaCasting(this.popularMovies,"movie");

                /* Generi dei film */
                this.generiFilms=responseGeneriFilm.data.genres;
                //console.log(this.generiFilms);
                this.generiTvShows = responseGeneriTvShows.data.genres;
                console.log(this.generiTvShows);
            })
        )    
        .catch(error=>{
            console.error('impossibile il caricamento: '+error);
        });

        
       
    } 
}) 
