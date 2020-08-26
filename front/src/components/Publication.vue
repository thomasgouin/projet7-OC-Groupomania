<template>
    <div class="publication">
        <div class="publication__header">
            <img src="@/assets/profile-pic.png" alt="image de profil par défaut" class="publication__header__img">
            <p class="publication__header__auteur">
                Thomas Gouin
            </p>
        </div>
        <div class="publication__main">
            <p class="publication__main__texte">
                {{publication.title}} 
            </p>
            <img src="@/assets/Logo-rouge.png" alt="Image ou git publiée par un utilisateur" class="publication__main__img">
        </div>
        <div class="publication__footer">
            <p class="publication__footer__date">
                {{publication.createdAt}}
            </p>
            <div class="publication__footer__social">
                <img src="@/assets/comment-solid.png" alt="icone pour les commentaires" class="icones-social">
            </div>

        </div>
    </div>

</template>
<script>
import {mapState} from 'vuex';
export default {
    name:"Publication",
    components: {},
    data(){
        return {}
    },
    computed:{
        ...mapState(["publications"])
    },
    props: {
        publication: {
            type:Object,
            required: true
        }
    },
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
            max-width: 270px;
        }
    }
    &__footer{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }
}
.icones-social{
    max-width: 30px;
}
    
</style>