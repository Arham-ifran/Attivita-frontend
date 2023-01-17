import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';
import faqImg from '../../assets/images/faqs-img.svg'
import { beforeFaqs, getFaqList } from './faq.action'
import "./Faq.css";


// class Faq extends Component{
const Faq = (props) => {
	const [faqs, setFaqs] = useState([])

	useEffect(() => {
		props.getFaqList()
	}, []);

	useEffect(() => {
		if (props.faq.getFaqList) {
			setFaqs(props.faq.faqList.faqs)
			props.beforeFaqs()
		}
	}, [props.faq.getFaqList]);
	return (
		<section className="faqs custom-container">
			<Container fluid>
				<Row className="align-items-center">
					<Col lg="6" md="6" xs="12">
						<div className="faqs-img">
							<img src={faqImg} className="img-fluid" alt="faqs" title="" />
						</div>
					</Col>
					<Col lg="6" md="6" xs="12">
						<div className="faqs-text">
							<h2>FAQs</h2>
							<div className="faqs-accordion accordion">
								<Accordion>
									{
										faqs.length > 0 ?
											faqs.map((faq, index) => {
												return (
													<Card key={index}>
														<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
															<h3 className="accordion-header">{index + 1}. {faq.title} </h3>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey={index + 1} className="accordion-body border-bottom ">
															<Card.Body dangerouslySetInnerHTML={{ __html: faq.desc }}></Card.Body>
														</Accordion.Collapse>
													</Card>

												)
											})
											: ''
									}
								</Accordion>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

const mapStateToProps = state => ({
	errors: state.errors,
	faq: state.faq
});
export default connect(mapStateToProps, { beforeFaqs, getFaqList })(Faq);
