import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import '../backend/firebase/firebaseConfig'
import PageChange from "components/PageChange/PageChange.js";
import {AuthProvider} from "backend/hook/auth";
import AuthStateChanged from "components/auth/authStateChanged";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";

import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    document.body.classList.add("body-page-transition");
    ReactDOM.render (<PageChange path={url}/>, document.getElementById("page-transition"));
});
Router.events.on("routeChangeComplete", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
    componentDidMount() {
        let comment = document.createComment(`

=========================================================
* Notus NextJS - v1.1.0 based on Tailwind Starter Kit by Creative Tim
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-nextjs
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
        document.insertBefore(comment, document.documentElement);
    }
    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }
    render() {
        const {Component, pageProps} = this.props;

        const Layout = Component.layout || (({children}) => <> {children}</>);

        return (<React.Fragment>
            <AuthProvider>
                <AuthStateChanged>
                <AlertProvider template={AlertTemplate} {...options}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <title>I Will Change This Later</title>
                    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
                </Head>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
                </AlertProvider>
                </AuthStateChanged>
            </AuthProvider>
        </React.Fragment>);
    }
}
