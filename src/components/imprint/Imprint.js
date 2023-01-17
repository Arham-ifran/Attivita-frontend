import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoFairness from '../../assets/images/logo-fairness-90.png'
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";



const Imprint = (props) => {
	let { customername } = ENV.getUserKeys();
	return (
		<div>
			{customername ? <AuthHeader /> : <Header />}

			<section className="terms-of-use-content">
				<Container>
					<h5 className="mb-5">
						<strong>TIMmunity GmbH</strong>
					</h5>
					<ul className="list-unstyled mb-4">
						<li className="mb-2">Erftstr. 15</li>
						<li className="mb-2">38120 Braunschweig</li>
						<li className="mb-2">Germany</li>
					</ul>
					<div className="mb-4">
						<div className="mb-3">
							<span>
								<strong>Managing Director:</strong>
							</span>
							<span> Steffens Tim Sebastian, Steffens Elke Steffi</span>
						</div>
						<div className="mb-3">
							<span>
								<strong>Register court:</strong>
							</span>
							<span>  Local court Braunschweig</span>
						</div>
						<div className="mb-3">
							<span>
								<strong>Registration number:</strong>
							</span>
							<span>  208156</span>
						</div>
						<div className="mb-3">
							<span>
								<strong>VAT ID:</strong>
							</span>
							<span>  DE327709293</span>
						</div>
						<div className="mb-3">
							<span>
								<strong>Tax ID: </strong>
							</span>
							<span>14/201/04214</span>
						</div>
						<div className="mb-3">
							<span>
								<strong>D-U-N-S® Number:</strong>
							</span>
							<span>  34-305-1271</span>
						</div>
						<div className="mb-3">
							<span>
								<strong>LEI code: </strong>
							</span>
							<span>9845000761D9984BF959</span>
						</div>
						<div className="mb-3">
							<span>
								<strong>Approval Federal Network Agency Germany Registration number: </strong>
							</span>
							<span> 19/217
								http://www.bundesnetzagentur.de Directory of notified companies
							</span>
						</div>
					</div>
					<h4 className="mb-3">
						<strong>Contact us</strong>
					</h4>
					<div className="mb-3">
						<strong>e-mail support:</strong>
						<p>info@timmunity.com</p>
					</div>
					<div className="mb-3">
						<strong>WhatsApp & Telegram support:</strong>
						<p>Monday & Thursday from 15 to 19</p>
						<p>+49 1579 2301998</p>
					</div>
					<h4 className="mb-3">
						<strong>Governmental inquiries</strong>
					</h4>
					<div className="mb-3">
						<strong>Phone Germany:</strong>
						<p>+49 531 40202440</p>
					</div>
					<div className="mb-3">
						<strong>FaxGermany:</strong>
						<p>+49 531 18051054</p>
					</div>
					<div className="mb-5">
						<strong>Email:</strong>
						<p>tkuv@aikQ.de</p>
					</div>
					<div className="mb-5">
						<strong>Server location:</strong>
						<p>Hetzner Online GmbH

							http://www.hetzner.de

							Industriestr. 25

							91710 Gunzenhausen

							Germany</p>
					</div>
					<div className="mb-5">
						<strong>Operator:</strong>
						<ul className="list-unstyled">
							<li>timmunity.at</li>
							<li>timmunity.biz</li>
							<li>timmunity.ch</li>
							<li>timmunity.com</li>
							<li>timmunity.de</li>
							<li>timmunity.email</li>
							<li>timmunity.eu</li>
							<li>timmunity.info</li>
							<li>timmunity.net</li>
							<li>timmunity.org</li>
							<li>timmunity.software</li>
						</ul>
					</div>
					<div className="mb-5">
						<strong>SSL :</strong>
					</div>
					<div className="mb-5">
						<strong>Online dispute resolution according to Art. 14 para. 1 ODR-VO:</strong>
						<p>The European Commission provides a platform for Online Dispute Resolution (OS). The platform can be found at</p>
						<p className="lengthy-content">https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=DE</p>
					</div>
					<div className="mb-5">
						<strong>Platform of the EU Commission for online dispute resolution:</strong>
						<span>https://ec.europa.eu/odr</span>
						<p>We are not obliged to participate in dispute settlement proceedings before a consumer arbitration board, but we are generally willing to do so.</p>
					</div>
					<div className="mb-5">
						<strong>Source:</strong>
						<span>http://www.e-recht24.de</span>
					</div>
					<div className="mb-5">
						<strong>Member of the initiative "Fairness in Trade"</strong>
					</div>
					<div className="mb-5">
						<strong>Further information:  </strong>
						<span>https://www.fairness-im-handel.de</span>
					</div>
					<div className="mb-4">
						<img src={LogoFairness} className="img-fluid" />
					</div>
					<div className="mb-5">
						<span>Source:</span>
						<a href="http://www.e-recht24.de">http://www.e-recht24.de</a>
					</div>
				</Container>
			</section>
			<Footer />
		</div>
	)
}


export default Imprint;