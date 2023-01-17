import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import { Container, Row, Col} from 'react-bootstrap';
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";
import { getPage, beforeCMS } from './CMS.action';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const CMS = (props) => {
    const myRef = useRef(null)
    let { customername } = ENV.getUserKeys();
    const [pageContent, setPageContent] = useState(null)
    const [language, setLanguage] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : '')
    const [loader, setLoader] = useState(true)
    let { slug } = useParams();
    // console.log('slug')
    // console.log(slug)
    useEffect(() => {
        props.getPage(window.location.pathname.split('/')[2])
    }, []);
    useEffect(() => {
        
        props.getPage(window.location.pathname.split('/')[2])
    }, [slug]);
    
    useEffect(() => { 
        if(myRef.current)
            myRef.current.scrollIntoView()
        
    }, [pageContent]);
    
    useEffect(() => {
        if(props.cms.getCms){
           
            console.log('props.cms.getCms')
            console.log(props.cms.getCms)
            if(language == 'de') {
                setPageContent(props.cms.content.germanDescription)
            }else{
                setPageContent(props.cms.content.description)
            }
            props.beforeCMS()
            setLoader(false)
        }
    }, [props.cms.getCms]);
    return (
        <div>
            {customername ? <AuthHeader /> : <Header />}

            {!loader ?
                <div id="main"  ref={myRef}>
                    <section className="terms-of-use-content">
                        <Container>
                            <Row>
                                {pageContent &&
                                    <Col sm={12} dangerouslySetInnerHTML={{ __html: pageContent }}>

                                    </Col>
                                }
                            </Row>
                        </Container>
                    </section>
                    <Footer />
                </div>
            :
            <SkeletonTheme color="#202020" highlightColor="#7E9DF3">
                <Container>
                    <Row>
                        <Col className="mt-3">
                            <Skeleton count={10} />
                            <br/>
                            <Skeleton count={10} />
                            <br/>
                            <Skeleton count={10} />
                        </Col>

                    </Row>
                </Container>
            </SkeletonTheme>
            }
        </div>
    )
}

const mapStateToProps = state => ({
	cms: state.cms
})
export default connect(mapStateToProps,{getPage, beforeCMS})(CMS)

