<template>
    <div class="publication">
        <div class="publication__header">
            <img src="@/assets/profile-pic.png" alt="image de profil par défaut" class="publication__header__img">
            <p class="publication__header__auteur">
                {{publication.user.firstname}} {{publication.user.lastname}}
            </p>
        </div>
        <div class="publication__main">
            <p class="publication__main__texte">
                {{publication.title}} 
            </p>
            <img :src="publication.attachment" alt="Image ou gif publiée par un utilisateur" class="publication__main__img">
        </div>
        <div class="publication__footer">
            <p class="publication__footer__date">
                {{publication.createdAt | moment}}
            </p>
            <div class="publication__footer__social">
                <button class="button-social"><img src="@/assets/comment-solid.png" alt="icone pour les commentaires" class="icones-social"></button>
                <button v-if="publication.userId == auth.user.id || auth.user.roles == 'ROLE_ADMIN'" class="button-social" @click="deletePost"><img src="@/assets/trash-alt-regular.png" alt="icone pour la suppression" class="icones-social"></button>
            </div>
        </div>
    </div>

</template>
<script>
import moment from 'moment';
import axios from 'axios';
import {mapState} from 'vuex';
export default {
    name:"Publication",
    components: {},
    data(){
        return {
        }
    },
    computed:{
        ...mapState(["publications","auth"])
    },
    props: {
        publication: {
            type:Object,
            required: true
        }
    },
    methods: {
        deletePost() {
            console.log(this.auth.user.id)
            axios
                .delete(`http://localhost:8081/api/publications/${this.publication.id}`)
                .then(() => {
                    window.location.reload();
                }) // ...Si non on envoi une erreur
                .catch(error => console.log(error));
        },
    },
    filters:{
        moment: (date)=>{
            return moment(date).locale('fr').format('LLL');
        }
    }
};
</script>
<style lang="scss" >

.publication{
    background-color: #ffff;
    border: solid 2px #042255;
    border-radius: 10px;
    margin-bottom: 10px;
    &__header{
        display: flex;
        padding: 15px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        &__img{
            max-width: 50px;
        }
        &__auteur{
            font-size: 20px;
        }
    }
    &__main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__img{
            width: 300px;
        }
        &__texte{
            padding-left: 15px;
            text-align: left;
        }
    }
    &__footer{
        margin-top: 10px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__social{
            display: flex;
            justify-content: space-evenly;
            width: 60%;
        }
        &__date{
            margin-top: 15px;

        }
    }
}
.button-social{
    border: none;
    background-color: white;
    
}
.icones-social{
    max-width: 25px;
    max-height: 25px;
}

    
</style>