<script>
export default {
    name: 'Nav',
}
</script>


<template>
    <nav class="navyy animate__animated animate__bounceInLeft" id="nav">
        <router-link to="/Profile" class="nav__linkk" exact-active-class="active">
            <i class="material-symbols-outlined nav__icon">account_circle</i>
            <span class="nav__text">Profile</span>
        </router-link>

        <router-link to="/Calls" class="nav__linkk" exact-active-class="active">
            <i class="material-symbols-outlined nav__icon">Call</i>
            <span class="nav__text">Calls</span>
        </router-link>
    </nav>
</template>

<style scoped>
.navyy {
    display: none;
}

@media screen and (max-width: 570px) {
    .navyy {
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 55px;
        bottom: 10px;
        left: 5%;
        background-color: var(--main-green-color);
        border-radius: 15px;
        z-index: 1000;
    }

    .nav__linkk {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #fff;
        user-select: none;
    }

    .nav__linkk.active {
        color: #BCB88A;
    }

    .nav__linkk::before {
        content: "";
        position: absolute;
        top: 5px;
        bottom: 5px;
        left: 50%;
        width: 1px;
        background-color: #808080;
    }

    .nav__icon {
        margin-right: 15px;
        font-size: 1.8rem;
    }
}
</style>