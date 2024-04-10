<script>
export default {
    name: 'Homepage'
}
</script>

<template>
    <header class="header" id="header">
        <nav class="dead container">
            <a href="#" class="nav__logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em" viewBox="0 0 50 50">
                    <path fill="#386b41" fill-rule="evenodd"
                        d="M35.88 42.563c-.324.44-.476.533-.881 1.101c-.674.87.185 2.191.613 1.983c.499-.187.823-1.183 1.368-1.508c.279-.15 1.021-1.24 1.716-1.981c.511-.581.882-.836 1.368-1.438c.823-1.021.997-1.797 1.716-2.887c.441-.568.755-.742 1.16-1.438c2.145-4.058 1.518-5.877 3.571-8.775c.625-.857 1.332-1.066 2.329-1.576c.928-6.76-2.145-10.539-2.121-10.551c-2.586 1.507-3.977 2.122-6.655 1.982c-1.008-.011-1.542-.44-2.538-.348c-.929.035-1.402.382-2.331.696c-1.425.44-2.202.834-3.697 1.298c-.951.267-1.554.278-2.54.614c-.846.36-.44.07-1.031.754c-.766.847-.58 1.507-1.299 2.957c-.893 1.901-.788 2.156-.278 2.388c-.336.973-.417 1.623-.336 2.678c.093.8-.244 1.356.614 1.994c1.171.869 3.629 2.91 4.255 2.944c.939-.034 3.675.07 5.065-.893c.313-.196.406-.395.14.348c-.058.094-3.467 2.748-3.837 2.736c-4.336.14-2.887.383-3.153.279c-.221 0-2.308-2.552-3.571-1.647c-.476.29-.696.568-.881 1.091c.162.336.927.868 1.635 1.31c1.021.649 1.113 1.333 2.133 1.576c1.241.279 2.562.093 3.351.198c.302.081 3.037-.72 4.741-1.635c1.578-.812-2.167 1.564-3.083 2.735c-2.76.869-1.982.904-3.293 1.171c-1.217.278-1.159.208-1.994.476c-.857.208-1.564 1.38-.753 1.994c.487.405 2.006-.163 3.501-.208c.661-.012 3.361-1.253 3.977-1.578c1.53-.822 2.655-1.959 3.56-2.608c1.249-.869-1.417 2.4-2.541 3.768m-8.359-16.66c.916.73 1.38 2.91 1.368 2.887c1.681.533 2.747 1.646 2.747 1.646c2.586-1.438 2.645-.789 3.769-1.646c.928-.638.882-.835 1.368-2.538c.452-1.381-1.148-1.253-2.47-3.769c-2.295.869-3.535.476-4.312.406c-.348-.046-.291 1.356-2.47 3.014M14.084 8.015c.325-.464.475-.557.893-1.102c.649-.893-.197-2.214-.615-2.052c-.51.232-.834 1.229-1.449 1.577c-.221.127-.962 1.217-1.646 1.983c-.51.557-.881.812-1.368 1.449c-.834.985-.997 1.762-1.716 2.806c-.44.625-.765.788-1.16 1.507c-2.144 4.035-1.53 5.854-3.571 8.707c-.625.916-1.333 1.113-2.33 1.646c-.927 6.748 2.134 10.516 2.122 10.493c2.585-1.474 3.965-2.088 6.655-1.995c1.008.059 1.542.487 2.539.417c.928-.058 1.403-.405 2.33-.684c1.426-.475 2.203-.869 3.629-1.31c1.02-.29 1.623-.302 2.608-.685c.847-.312.441-.022 1.032-.685c.753-.869.58-1.529 1.229-2.943c.962-1.938.858-2.191.348-2.4c.325-.997.417-1.635.336-2.678c-.104-.812.244-1.38-.614-1.982c-1.171-.905-3.629-2.945-4.243-2.957c-.951.012-3.687-.093-5.078.823c-.313.243-.406.44-.139-.267c.058-.127 3.467-2.782 3.837-2.817c4.336-.093 2.887-.336 3.154-.208c.22-.023 2.307 2.527 3.571 1.646c.463-.312.695-.591.893-1.089c-.174-.359-.939-.894-1.646-1.299c-1.02-.683-1.124-1.367-2.133-1.588c-1.241-.301-2.574-.116-3.351-.267c-.301-.035-3.038.766-4.73 1.646c-1.6.847 2.157-1.53 3.083-2.747c2.748-.824 1.96-.858 3.293-1.16c1.206-.244 1.148-.174 1.983-.417c.846-.232 1.564-1.392.753-2.052c-.498-.371-2.005.197-3.489.208c-.672.046-3.374 1.287-3.988 1.635c-1.53.8-2.655 1.936-3.559 2.539c-1.266.916 1.412-2.342 2.537-3.698m8.359 16.659c-.916-.753-1.38-2.932-1.368-2.944c-1.681-.499-2.748-1.612-2.748-1.577c-2.585 1.403-2.654.754-3.768 1.577c-.939.673-.881.881-1.368 2.528c-.453 1.438 1.136 1.298 2.469 3.779c2.296-.836 3.537-.441 4.313-.349c.348.024.29-1.379 2.47-3.014" />
                </svg> SalinSenyas
            </a>
            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item">
                        <a href="#home" class="nav__link active-link">Home</a>
                    </li>
                    <li class="nav__item">
                        <a href="#about" class="nav__link">About</a>
                    </li>
                    <li class="nav__item">
                        <a href="#products" class="nav__link">Letter Index</a>
                    </li>
                    <li class="nav__item">
                        <a href="#faqs" class="nav__link">FAQs</a>
                    </li>
                    <li class="nav__item">
                        <a href="#faqs" class="nav__link" style="
                            background-color: var(--first-color);
                            color: #FFF;
                            padding-top: 7px;
                            padding-bottom: 7px;
                            padding-left: 15px;
                            padding-right: 15px;
                            border-radius: 1.5rem;
                            font-weight: var(--font-medium);
                            transition: .3s;">Sign in</a>
                    </li>

                </ul>

                <div class="nav__close" id="nav-close">
                    <i class="ri-close-line"></i>
                </div>

            </div>

            <div class="nav__btns">
                <!-- Theme change button -->
                <i class="ri-moon-line change-theme" id="theme-button"></i>

                <div class="nav__toggle" id="nav-toggle">
                    <i class="ri-menu-line"></i>
                </div>
            </div>
        </nav>
    </header>

    <main class="main">
        <!--==================== HOME ====================-->
        <section class="home" id="home">
            <div class="home__container container grid">
                <img src="../assets/img/deaf-mute.png" alt="" class="home__img">

                <div class="home__data">
                    <h1 class="home__title">
                        The Future of <br> Communication Starts Here.
                    </h1>
                    <p class="home__description">
                        A breakthrough AI-Powered platform to create a real-time translation system with live video
                        capture that uses computer vision algorith to recognize American Sign Language(ASL).
                    </p>
                    <a href="#about" class="button button--flex">
                        Try now! <i class="ri-arrow-right-line button__icon"></i>
                    </a>
                </div>

                <div class="home__social">
                    <span class="home__social-follow">Follow Us</span>

                    <div class="home__social-links">
                        <a href="https://www.facebook.com/" target="_blank" class="home__social-link">
                            <i class="ri-facebook-fill"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" class="home__social-link">
                            <i class="ri-instagram-line"></i>
                        </a>
                        <a href="https://twitter.com/" target="_blank" class="home__social-link">
                            <i class="ri-twitter-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!--==================== ABOUT ====================-->
        <section class="about section container" id="about">
            <div class="about__container grid">
                <img src="../assets/img/video-conference.png" alt="" class="about__img">

                <div class="about__data">
                    <h2 class="section__title about__title">
                        What is the purpose & <br> why choose us
                    </h2>

                    <div class="about__details">
                        <p class="about__details-description">
                            <i class="ri-checkbox-fill about__details-icon"></i>
                            Provide real-time sign language recognition as it is being performed by the users.
                        </p>
                        <p class="about__details-description">
                            <i class="ri-checkbox-fill about__details-icon"></i>
                            Offers a share call link option that allows users to choose whether peer to peer or a group
                            call.
                        </p>
                        <p class="about__details-description">
                            <i class="ri-checkbox-fill about__details-icon"></i>
                            Implement voice translation for recognized signs and texts.
                        </p>
                        <p class="about__details-description">
                            <i class="ri-checkbox-fill about__details-icon"></i>
                            Includes in-call chat that can upload files, links, and media.
                        </p>
                    </div>

                    <a href="#step" class="button--link button--flex">
                        Explore Now <i class="ri-arrow-right-down-line button__icon"></i>
                    </a>
                </div>
            </div>
        </section>

        <!--==================== STEPS ====================-->
        <section class="steps section container" id="step">
            <div class="steps__bg">
                <h2 class="section__title-center steps__title">
                    Steps to start a <br> communication with deaf
                </h2>

                <div class="steps__container grid">
                    <div class="steps__card">
                        <div class="steps__card-number">01</div>
                        <h3 class="steps__card-title">Sign-up</h3>
                        <p class="steps__card-description">
                            You can sign-up above to have a account. But if you have one already you can log-in now
                        </p>
                    </div>

                    <div class="steps__card">
                        <div class="steps__card-number">02</div>
                        <h3 class="steps__card-title">Sign-in</h3>
                        <p class="steps__card-description">
                            Once you're done creating account, now you can log-in to start.
                        </p>
                    </div>

                    <div class="steps__card">
                        <div class="steps__card-number">03</div>
                        <h3 class="steps__card-title">Join or Create Call</h3>
                        <p class="steps__card-description">
                            Click the button "Join" or "Create Call" to start.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!--==================== PRODUCTS ====================-->
        <section class="product section container" id="products">
            <h2 class="section__title-center">
                Check out the <br> Letter Index
            </h2>

            <p class="product__description">
                Here are some selected translation of the letter index that will demo to you of how hands translate the
                letter.
            </p>

            <div class="product__container grid">
                <article class="product__card">
                    <div class="product__circle"></div>

                    <img src="../assets/img/signs/Ss.png" alt="" class="product__img">

                    <h3 class="product__title">Letter</h3>
                    <span class="product__price">S</span>

                    <button class="button--flex product__button">
                        <i class="ri-arrow-right-line button__icon"></i>
                    </button>
                </article>

                <article class="product__card">
                    <div class="product__circle"></div>

                    <img src="../assets/img/signs/Ee.png" alt="" class="product__img">

                    <h3 class="product__title">Letter</h3>
                    <span class="product__price">E</span>

                    <button class="button--flex product__button">
                        <i class="ri-arrow-right-line button__icon"></i>
                    </button>
                </article>

                <article class="product__card">
                    <div class="product__circle"></div>

                    <img src="../assets/img/signs/Nn.png" alt="" class="product__img">

                    <h3 class="product__title">Letter</h3>
                    <span class="product__price">N</span>

                    <button class="button--flex product__button">
                        <i class="ri-arrow-right-line button__icon"></i>
                    </button>
                </article>

                <article class="product__card">
                    <div class="product__circle"></div>

                    <img src="../assets/img/signs/Yy.png" alt="" class="product__img">

                    <h3 class="product__title">Letter</h3>
                    <span class="product__price">Y</span>

                    <button class="button--flex product__button">
                        <i class="ri-arrow-right-line button__icon"></i>
                    </button>
                </article>

                <article class="product__card">
                    <div class="product__circle"></div>

                    <img src="../assets/img/signs/Aa.png" alt="" class="product__img">

                    <h3 class="product__title">Letter</h3>
                    <span class="product__price">A</span>

                    <button class="button--flex product__button">
                        <i class="ri-arrow-right-line button__icon"></i>
                    </button>
                </article>

                <article class="product__card">
                    <div class="product__circle"></div>

                    <img src="../assets/img/signs/Ss.png" alt="" class="product__img">

                    <h3 class="product__title">Letter</h3>
                    <span class="product__price">S</span>

                    <button class="button--flex product__button">
                        <i class="ri-arrow-right-line button__icon"></i>
                    </button>
                </article>
                <div class="explore1">
                    <a href="#about" class="button button--flex">
                        Explore <i class="ri-arrow-right-down-line button__icon"></i>
                    </a>
                </div>
            </div>
        </section>
        <!--==================== QUESTIONS ====================-->
        <section class="questions section" id="faqs">
            <h2 class="section__title-center questions__title container">
                Some common questions <br> were often asked
            </h2>

            <div class="questions__container container grid">
                <div class="questions__group">
                    <div class="questions__item">
                        <header class="questions__header">
                            <i class="ri-add-line questions__icon"></i>
                            <h3 class="questions__item-title">
                                How secure is the messaging platform?
                            </h3>
                        </header>

                        <div class="questions__content">
                            <p class="questions__description">
                                Most messaging platforms use end-to-end encryption to secure messages. So, you don't
                                need to worry about the system's security.
                            </p>
                        </div>
                    </div>

                    <div class="questions__item">
                        <header class="questions__header">
                            <i class="ri-add-line questions__icon"></i>
                            <h3 class="questions__item-title">
                                How do I start a call?
                            </h3>
                        </header>

                        <div class="questions__content">
                            <p class="questions__description">
                                Making calls usually requires selecting a contact and choosing the call option.
                            </p>
                        </div>
                    </div>

                    <div class="questions__item">
                        <header class="questions__header">
                            <i class="ri-add-line questions__icon"></i>
                            <h3 class="questions__item-title">
                                How do I send a message?
                            </h3>
                        </header>

                        <div class="questions__content">
                            <p class="questions__description">
                                Sending a message usually involves selecting a contact or entering a recipient's name,
                                typing the message, and pressing send.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="questions__group">
                    <div class="questions__item">
                        <header class="questions__header">
                            <i class="ri-add-line questions__icon"></i>
                            <h3 class="questions__item-title">
                                Can I have group video calls?
                            </h3>
                        </header>

                        <div class="questions__content">
                            <p class="questions__description">
                                Group video calls may be available, but with a participant limit.
                            </p>
                        </div>
                    </div>

                    <div class="questions__item">
                        <header class="questions__header">
                            <i class="ri-add-line questions__icon"></i>
                            <h3 class="questions__item-title">
                                Can I send pictures, videos, and other media files?
                            </h3>
                        </header>

                        <div class="questions__content">
                            <p class="questions__description">
                                Yes, platforms allow sending pictures, videos, and other media files.
                            </p>
                        </div>
                    </div>

                    <div class="questions__item">
                        <header class="questions__header">
                            <i class="ri-add-line questions__icon"></i>
                            <h3 class="questions__item-title">
                                Are group chats private, and who can see the messages?
                            </h3>
                        </header>

                        <div class="questions__content">
                            <p class="questions__description">
                                Group chat privacy settings may vary.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!--==================== FOOTER ====================-->
    <footer class="footer section">
        <div class="footer__container container grid">
            <div class="footer__content">
                <a href="#" class="footer__logo">
                    <i class="ri-leaf-line footer__logo-icon"></i> Salensenyas
                </a>

                <h3 class="footer__title">
                    Subscribe to our facebook page <br> to stay update
                </h3>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">Our Address</h3>

                <ul class="footer__data">
                    <li class="footer__information">1234 - Litex</li>
                    <li class="footer__information">Commowealth - 1121</li>
                    <li class="footer__information">123-456-789</li>
                </ul>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">Contact Us</h3>

                <ul class="footer__data">
                    <li class="footer__information">+999 888 777</li>

                    <div class="footer__social">
                        <a href="https://www.facebook.com/" class="footer__social-link">
                            <i class="ri-facebook-fill"></i>
                        </a>
                        <a href="https://www.instagram.com/" class="footer__social-link">
                            <i class="ri-instagram-line"></i>
                        </a>
                        <a href="https://twitter.com/" class="footer__social-link">
                            <i class="ri-twitter-fill"></i>
                        </a>
                    </div>
                </ul>
            </div>

            <div class="footer__content">
                <h3 class="footer__title">
                    Thank you for visiting us!
                </h3>
            </div>
        </div>
        <p class="footer__copy">© 2024 SalinSenyas. All rights reserved</p>
    </footer>

    <!--=============== SCROLL UP ===============-->
    <a href="#" class="scrollup" id="scroll-up">
        <i class="ri-arrow-up-fill scrollup__icon"></i>
    </a>
</template>

<style scoped>
@import url('../assets/css/Homepage-style.css');
</style>