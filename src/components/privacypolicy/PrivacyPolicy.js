import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoFairness from '../../assets/images/logo-fairness-90.png'
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";

const PrivacyPolicy = (props) => {
    let { customername } = ENV.getUserKeys();
    return (
        <div>
            {customername ? <AuthHeader /> : <Header />}

            <section className="terms-of-use-content">
                <Container>
                    <h3 className="mb-3">Privacy Policy</h3>
                    <ol>
                        <li>
                            <p className="mb-3">
                                <strong>Information on the collection of personal data and contact details of the person responsible</strong>
                            </p>
                            <ul>
                                <li>
                                    <p> Thank you for your interest. We are pleased that you visited our website and going to use TIMmunity GmbH products. In the following, we will inform you about how we handle your personal data when you use our website. Personal data is all data with which you can be personally identified.</p>
                                </li>
                                <li>
                                    <p>The person responsible for data processing on this website in terms of the Data Protection Basic Regulation (DSGVO) is TIMmunity GmbH, Erftstr. 15, 38120 Braunschweig, Germany, Tel.: +49 531 40202440, Fax: +49 531 18051054, E-Mail: <a href="http://info@timmunity.com/">info@timmunity.com</a>. The person responsible for processing personal data is the natural or legal person who, alone or jointly with others, decides on the purposes and means of processing personal data.</p>
                                </li>
                                <li>
                                    <p>For security reasons and to protect the transmission of personal data and other confidential contents (e.g., orders or inquiries to the responsible person), this website uses SSL or TLS encryption. You can recognize an encrypted connection by the character string "https://" and the lock symbol in your browser line.</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong>Data collection when visiting our website</strong></p>
                                <p>When using our website for informational purposes only, i.e., if you do not register or otherwise provide us with information, we only collect the data that your browser sends to our server (so-called "server log files"). When you call up our website, we collect the following data, which are technically necessary for us to display the website:</p>
                            </div>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong>Cookies</strong></p>
                            </div>
                            <p>To make visiting our website attractive and to enable the use of certain functions, we use so-called cookies on various pages. These are small text files that are stored on your end device. Some of the cookies we use are deleted again after the end of the browser session, i.e., after closing your browser (so-called session cookies). Other cookies remain on your terminal device and enable us to recognize your browser the next time you visit us (so-called persistent cookies). If cookies are set, they collect and process certain user information to an individual extent, such as browser and location data and IP address values. Persistent cookies are automatically deleted after a specified period of time, which may vary depending on the cookie. The duration of the respective cookie storage can be found in the overview of the cookie settings of your web browser.</p>
                            <p>In some cases, cookies are used to simplify the ordering process by saving settings (e.g., remembering the contents of a virtual shopping cart for a later visit to the website). Insofar as personal data are also processed by individual cookies used by us, the processing is carried out in accordance with Art. 6 Para. 1 letter b DSGVO either for the execution of the contract, in accordance with Art. 6 Para. 1 letter a DSGVO in case of given consent or in accordance with Art. 6 Para. 1 letter f DSGVO to safeguard our legitimate interests in the best possible functionality of the website and a customer-friendly and effective design of the site visit.</p>
                            <p>Please note that you can set your browser so that you are informed about the setting of cookies and can decide individually whether to accept them or to exclude the acceptance of cookies for certain cases or generally. Each browser differs in the way it manages the cookie settings. This is described in the help menu of each browser, which explains how you can change your cookie settings. You can find these for each browser under the following links:</p>
                            <ul className="custom-padding mb-3">
                                <li>
                                    <span>Internet Explorer:</span>
                                    <a className="lengthy-content" href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies">https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies</a>
                                </li>
                                <li>
                                    <span>Firefox</span>
                                    <a className="lengthy-content" href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen">https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen</a>
                                </li>
                                <li>
                                    <span>Chrome:</span>
                                    <a className="lengthy-content" href="https://support.google.com/chrome/answer/95647?hl=de&hlrm=en">https://support.google.com/chrome/answer/95647?hl=de&hlrm=en</a>
                                </li>
                                <li>
                                    <span>Safari:</span>
                                    <a className="lengthy-content" href="https://support.apple.com/de-de/guide/safari/sfri11471/mac">https://support.apple.com/de-de/guide/safari/sfri11471/mac</a>
                                </li>
                                <li>
                                    <span>Opera:</span>
                                    <a className="lengthy-content" href="https://help.opera.com/de/latest/web-preferences/#cookies">https://help.opera.com/de/latest/web-preferences/#cookies</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong> Making contact</strong></p>
                            </div>
                            <ul>
                                <li>
                                    <p> Personal data is collected when contacting us (e.g, via contact form or e-mail). Which data is collected in the case of a contact form can be seen from the respective contact form. These data are stored and used exclusively for the purpose of answering your request or for contacting you and the associated technical administration. The legal basis for the processing of this data is our legitimate interest in answering your request in accordance with Art. 6 para. 1 lit. f DSGVO. If your contact is aimed at the conclusion of a contract, an additional legal basis for the processing is Art. 6 para. 1 lit. b DSGVO. Your data will be deleted after the final processing of your request. This is the case if it can be deduced from the circumstances that the matter in question has been conclusively clarified and provided that there are no statutory retention obligations to the contrary.</p>
                                </li>
                                <li>
                                    <p>WhatsApp Business</p>
                                    <p>We offer visitors to our Website the opportunity to contact us through the WhatsApp news service of WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Ireland. For this purpose, we use the so-called "Business Version" of WhatsApp.</p>
                                    <p>If you contact us via WhatsApp in connection with a specific business transaction (e.g., an order placed), we will store and use the mobile phone number you use at WhatsApp and - if provided - your first name and surname in accordance with Art. 6 para. 1 lit. b. DSGVO for processing and answering your request. Based on the same legal basis, we will ask you via WhatsApp to provide further data (order number, customer number, address, or e-mail address), if necessary, in order to be able to assign your request to a specific transaction.</p>
                                    <p>If you use our WhatsApp contact for general inquiries (e.g., about our range of services, availability, or our Internet presence), we will store and use the mobile phone number you use at WhatsApp and - if provided - your first and last name in accordance with Art. 6 Para. 1 lit. f DSGVO on the basis of our legitimate interest in the efficient and prompt provision of the requested information.</p>
                                    <p>Your data will always be used only to answer your request via WhatsApp. Your data will not be passed on to third parties.</p>
                                    <p>Please note that WhatsApp Business gains access to the address book of the mobile device we use for this purpose and automatically transfers telephone numbers stored in the address book to a server of the parent company Facebook Inc. in the USA. To operate our WhatsApp Business account, we use a mobile device whose address book stores only the WhatsApp contact data of users who have contacted us via WhatsApp.</p>
                                    <p>This ensures that every person whose WhatsApp contact data is stored in our address book has already consented to the transmission of his WhatsApp telephone number from the address books of his chat contacts in accordance with Art. 6 Para. 1 lit. a DSGVO when using the app on his device for the first time by accepting the WhatsApp terms of use. The transmission of data of such users who do not use WhatsApp and/or have not contacted us via WhatsApp is therefore excluded.</p>
                                    <p>The purpose and scope of data collection and the further processing and use of the data by WhatsApp as well as your rights and settings options to protect your privacy are described in WhatsApp's privacy policy: https://www.whatsapp.com/legal/?eea=1#privacy-policy</p>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong>Data processing when opening a customer account and for contract processing</strong></p>
                            </div>
                            <p>In accordance with Art. 6 Para. 1 lit. b DSGVO, personal data will continue to be collected and processed if you provide us with this information for the purpose of executing a contract or opening a customer account. Which data is collected can be seen from the respective input forms. Deletion of your customer account is possible at any time and can be done by sending a message to the above-mentioned address of the responsible person. We store and use the data you provide us with to process the contract. After complete processing of the contract or deletion of your customer account, your data will be blocked with regard to tax and commercial law retention periods and deleted after these periods have expired, unless you have expressly consented to further use of your data or a legally permitted further use of data has been reserved by us.</p>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong>Use of customer data for direct advertising</strong></p>
                            </div>
                            <ul>
                                <li>
                                    <p>Registration for our e-mail newsletter</p>
                                    <p>If you register for our e-mail newsletter, we will send you regular information about our offers. Your e-mail address is the only mandatory information for sending the newsletter. The provision of further data is voluntary and is used to address you personally. We use the so-called double opt-in procedure for sending the newsletter. This means that we will only send you an e-mail newsletter if you have expressly confirmed that you agree to receive newsletters. We will then send you a confirmation e-mail asking you to confirm that you wish to receive the newsletter in the future by clicking on a corresponding link.</p>
                                    <p>By activating the confirmation link, you give us your consent for the use of your personal data in accordance with Art. 6 Para. 1 lit. a DSGVO. When you register for the newsletter, we save your IP address entered by your Internet Service Provider (ISP) as well as the date and time of registration in order to be able to trace a possible misuse of your e-mail address at a later date. The data collected by us when registering for the newsletter will be used exclusively for the purpose of advertising in the newsletter. You can unsubscribe from the newsletter at any time using the link provided for this purpose in the newsletter or by sending a message to the person responsible mentioned above. After you have canceled your subscription, your e-mail address will be deleted from our newsletter distribution list immediately, unless you have expressly consented to further use of your data or we reserve the right to use your data for other purposes that are permitted by law and about which we inform you in this declaration.</p>
                                </li>
                                <li>
                                    <p>Sending the e-mail newsletter to existing customers</p>
                                    <p>If you have provided us with your e-mail address when purchasing goods or services, we reserve the right to send you regular e-mail offers on similar goods or services from our range of products to those you have already purchased. In accordance with § 7 paragraph 3 UWG, we do not need to obtain your separate consent for this. In this respect, data processing is carried out solely on the basis of our justified interest in personalized direct advertising in accordance with Art. 6 Para. 1 lit. f DSGVO. If you have initially objected to the use of your e-mail address for this purpose, we will not send you an e-mail. You are entitled to object to the use of your e-mail address for the above-mentioned advertising purpose at any time with effect for the future by notifying the person responsible named at the beginning of this document. For this, you will only incur transmission costs in accordance with the basic rates. After receipt of your objection, the use of your e-mail address for advertising purposes will be immediately discontinued.</p>
                                </li>
                                <li>
                                    <p>Advertising by letter post</p>
                                    <p>On the basis of our justified interest in personalized direct advertising, we reserve the right to store your first and last name, your postal address, and - insofar as we have received this additional information from you within the scope of the contractual relationship - your title, academic degree, year of birth and your professional, industry or business name in accordance with Art. 6 Para. 1 letter f DSGVO and to use this information to send you interesting offers and information on our products by post.</p>
                                    <p>You can object to the storage and use of your data for this purpose at any time by sending an appropriate message to the person responsible.</p>
                                </li>
                                <li>
                                    <p> Notification of availability of goods by e-mail</p>
                                    <p>If we offer the possibility in our online shop for selected, temporarily unavailable items to inform you by e-mail about the time of availability, you can register for our e-mail notification service for the availability of goods. If you register for our e-mail notification service for the availability of goods, we will send you a one-time e-mail message about the availability of the item you have selected. Your e-mail address is the only mandatory information for sending this notification. The provision of further data is voluntary and may be used to contact you personally. We use the so-called double opt-in procedure for sending this notification. This means that we will only send you a corresponding notification if you have expressly confirmed to us that you agree to receive such a message. We will then send you a confirmation e-mail asking you to click on a link to confirm that you wish to receive such a notification.</p>
                                    <p>By activating the confirmation link, you give us your consent for the use of your personal data in accordance with Art. 6 para. 1 lit. a DSGVO. When you register for our e-mail notification service on product availability, we store your IP address entered by your Internet Service Provider (ISP) as well as the date and time of registration in order to be able to trace any possible misuse of your e-mail address at a later date. The data collected by us when you register for our e-mail notification service for product availability is used exclusively for the purpose of informing you about the availability of a particular item in our online shop. You can unsubscribe from the e-mail notification service for the availability of goods at any time by sending a message to the responsible person named at the beginning of this page. After cancellation, your e-mail address will be deleted immediately from our mailing list set up for this purpose, unless you have expressly consented to further use of your data or we reserve the right to use data beyond this which is permitted by law and about which we inform you in this declaration</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong>  Data processing for order processing</strong></p>
                            </div>
                            <ul>
                                <li>
                                    <p> In order to process your order, we work together with the following service provider(s), who support us in whole or in part in the execution of concluded contracts. Certain personal data will be transmitted to these service providers in accordance with the following information.</p>
                                    <p>The personal data collected by us will be passed on to the transport company commissioned with the delivery within the scope of contract processing, insofar as this is necessary for the delivery of the goods. Your payment data will be passed on to the assigned credit institute within the scope of the payment processing, as far as this is necessary for the payment processing. If payment service providers are used, we will inform you explicitly about this below. The legal basis for the transfer of data is Art. 6 para. 1 lit. b DSGVO.</p>

                                </li>
                                <li>
                                    <p className="mb-3">- Mollie</p>
                                    <p>If you choose a payment method from the payment service provider Mollie, the payment will be processed via the payment service provider Mollie B.V., Keizersgracht 313, 1016 EE Amsterdam, the Netherlands, to whom we will pass on the information you provide during the ordering process, together with the information about your order (name, address, IBAN, BIC, invoice amount, currency and transaction number) in accordance with Art. 6 para. 1 letter b DSGVO. Your data will only be passed on for the purpose of payment processing with the payment service provider Mollie and only to the extent necessary for this purpose.</p>
                                </li>
                                <li>
                                    <p className="mb-3">- Paypal</p>
                                    <p>In the case of payment via PayPal, credit card via PayPal, direct debit via PayPal, or - if offered - "purchase on account" or "payment by installments" via PayPal, we will pass on your payment data to PayPal (Europe) S.a.r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg (hereinafter "PayPal") within the framework of the payment processing. The data will be passed on in accordance with Art. 6 para. 1 lit. b DSGVO and only to the extent necessary for the processing of payments.</p>
                                    <p>PayPal reserves the right to carry out a credit check for the payment methods credit card via PayPal, direct debit via PayPal, or - if offered - "purchase on account" or "payment by installments" via PayPal. For this purpose, your payment data may be passed on to credit agencies pursuant to Art. 6 para. 1 lit. f DSGVO on the basis of PayPal's legitimate interest in determining your solvency. PayPal uses the result of the credit assessment with regard to the statistical probability of non-payment to decide on the provision of the respective payment method. The credit report may contain probability values (so-called score values). If score values are included in the result of the credit report, they are based on a scientifically recognized mathematical-statistical procedure. The calculation of score values includes, but is not limited to, address data. Further information on data protection, including information on the credit agencies used, can be found in PayPal's privacy policy: <a className="lengthy-content" href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" className="lengthy-content">https://www.paypal.com/de/webapps/mpp/ua/privacy-full</a></p>
                                    <p>You can object to this processing of your data at any time by sending a message to PayPal. However, PayPal may still be entitled to process your personal data, if this is necessary for the contractual payment processing.</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p> <strong>  Using a live chat system </strong></p>
                            </div>
                            <p>Own live chat system</p>
                            <p>On this website, for the purpose of operating a live chat system to answer live requests, your communicated chat name, and chat content is collected as data and stored for the course of the chat. The chat and your specified chat name are stored exclusively in RAM (Random Access Memory) and are deleted immediately as soon as you or we have finished the chat conversation, but no later than 2 hours after the last message in the chat history. Cookies are used to operate the chat function. Cookies are small text files that are stored locally in the cache of the site visitor's Internet browser. The cookies enable the recognition of the site visitor's Internet browser to ensure that the individual users of the chat function on our website can be distinguished.</p>
                            <p>If the information collected in this way contains a personal reference, it is processed in accordance with Art. 6 Para. 1 letter f DSGVO on the basis of our justified interest in effective customer service and the statistical analysis of user behavior for optimization purposes.</p>
                            <p>In order to avoid the storage of cookies, you can set your Internet browser so that no more cookies can be stored on your computer in the future or that already stored cookies are deleted. However, switching off all cookies may mean that the chat function on our website can no longer be executed.</p>
                            <p>Zammad</p>
                            <p>On this website, pseudonymized data is collected and stored using technologies of Zammad GmbH, Marienstraße 11, 10117 Berlin (www.zammad.com) for the purpose of web analysis and for operating the live chat system, which is used to answer live support requests. From this pseudonymized data, user profiles can be created under a pseudonym. Cookies can be used for this purpose. Cookies are small text files that are stored locally in the cache of the site visitor's Internet browser. Among other things, the cookies enable the recognition of the Internet browser. If the information collected in this way contains a personal reference, it is processed in accordance with Art. 6 Para. 1 letter f DSGVO on the basis of our justified interest in effective customer service and the statistical analysis of user behavior for optimization purposes.</p>
                            <p>The data collected with Zammad technologies will not be used to personally identify the visitor of this website and will not be combined with personal data about the bearer of the pseudonym without the separate consent of the person concerned. In order to avoid the storage of Zammad cookies, you can set your Internet browser to prevent cookies from being stored on your computer in the future or to delete already stored cookies. However, switching off all cookies may mean that some functions on our Internet pages can no longer be executed. You can deactivate the collection and storage of data for the purpose of creating a pseudonymized user profile at any time with effect for the future by sending us your objection informally by e-mail to the e-mail address given in the imprint.</p>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p>  <strong>Tools and others</strong></p>
                            </div>
                            <ul>
                                <li>
                                    <p>Accounting Butler</p>
                                    <p>For the handling of the accounting, we use the service of the cloud-based accounting software BuchhaltungsButler GmbH, Ausbau 1, 15910 Unterspreewald. BuchhaltungsButler processes incoming and outgoing invoices as well as, if necessary, our company's bank transactions in order to automatically enter invoices, match them to transactions, and, in a partially-automated process, create financial accounting.</p>
                                    <p>If personal data is also processed in this process, the processing is carried out in accordance with Art. 6 Par. 1 letter f DSGVO on the basis of our justified interest in the efficient organization and documentation of our business transactions.</p>
                                    <p>Further information about BuchhaltungsButler GmbH, the automated processing of data, and the data protection regulations can be found at <a href="https://www.buchhaltungsbutler.de/">https://www.buchhaltungsbutler.de/</a></p>
                                </li>
                                <li>
                                    <p>Google reCAPTCHA</p>
                                    <p>On this website, we also use the reCAPTCHA feature of Google Ireland Limited, Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland ("Google"). This function is mainly used to distinguish whether an entry is made by a natural person or abusively by machine and automated processing. The service includes the sending of the IP address and, if applicable, other data required by Google for the reCAPTCHA service to Google and is carried out in accordance with Art. 6 para. 1 lit. f DSGVO on the basis of our legitimate interest in establishing individual responsibility on the Internet and avoiding abuse and spam. In the course of using Google reCAPTCHA, personal data may also be transferred to the servers of Google LLC. in the USA.</p>
                                    <p>Further information about Google reCAPTCHA and Google's privacy policy can be found at: <a className="lengthy-content" href="https://www.google.com/intl/de/policies/privacy/">https://www.google.com/intl/de/policies/privacy/</a></p>
                                    <p>Insofar as legally required, we have obtained your consent for the processing of your data as described above in accordance with Art. 6 para. 1 lit. a DSGVO. You can revoke your consent at any time with effect for the future. In order to exercise your revocation, please follow the above-mentioned option to make an objection.</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong> Rights of the data subject</strong></p>
                            </div>
                            <ul>
                                <li>
                                    <p>The applicable data protection law provides you comprehensive data subject rights (rights of information and intervention) vis-à-vis the data controller with regard to the processing of your personal data, about which we inform you below:</p>
                                    <p>- Right of access in accordance with Art. 15 DSGVO: In particular, you have a right of access to your personal data processed by us, the processing purposes, the categories of personal data processed, the recipients or categories of recipients to whom your data have been or will be disclosed, the planned storage period or the criteria for determining the storage period, the existence of a right of rectification, erasure, restriction of processing, opposition to processing, a complaint to a supervisory authority, the origin of your data if it has not been collected from you by us, the existence of automated decision making including profiling and, if applicable, meaningful information on the logic involved and the scope and intended effects of such processing on you, as well as your right to be informed of the clauses provided under Art. 46 DPA when your data is transferred to third countries;</p>
                                    <p>- Right of rectification under Art. 16 DPA: You have the right to have incorrect data relating to you corrected without delay and/or to have your incomplete data stored by us completed;</p>
                                    <p>- Right of deletion in accordance with Art. 17 DSGVO: You have the right to request the deletion of your personal data if the conditions of Art. 17 para. 1 DSGVO is met. However, this right does not apply in particular if the processing is necessary to exercise the right to freedom of expression and information, to fulfill a legal obligation, for reasons of public interest or to assert, exercise, or defend legal claims;</p>
                                    <p>- Right to limit processing pursuant to Art. 18 DPA: You have the right to request the limitation of the processing of your personal data for as long as the accuracy of your data which you dispute is verified if you refuse to delete your data on the grounds of unlawful processing and instead request the limitation of the processing of your data, if you require your data for the assertion, exercise or defense of legal claims after we no longer require such data after the purpose has been achieved, or if you have lodged an objection on grounds of your particular situation, as long as it has not yet been established that our legitimate reasons outweigh the objection;</p>
                                    <p>- Right to information in accordance with Art. 19 DSGVO: If you have asserted the right to rectification, erasure, or restriction of processing vis-à-vis the controller, the controller is obliged to notify all recipients to whom the personal data concerning you have been disclosed of this rectification, erasure, or restriction of processing unless this proves impossible or involves a disproportionate effort. You have the right to be informed about these recipients.</p>
                                    <p>- Right to data transferability in accordance with Art. 20 DSGVO: You have the right to receive your personal data that you have provided us with in a structured, common, and machine-readable format or to request that it be transferred to another person responsible, insofar as this is technically feasible;</p>
                                    <p>- Right to revoke the given consents pursuant to Art. 7 para. 3 DSGVO: You have the right to revoke at any time with effect for the future and consent to the processing of data once permitted. In the event of revocation, we will immediately delete the data concerned unless further processing cannot be based on a legal basis for processing without consent. The revocation of consent does not affect the lawfulness of the processing carried out on the basis of the consent until revocation;</p>
                                    <p>- right of appeal under Art. 77 DSGVO: If you believe that the processing of personal data relating to you is in breach of the DPA, you have the right - without prejudice to any other administrative or judicial remedy - to lodge a complaint with a supervisory authority, in particular in the Member State in which you are resident, your place of work or the place where the alleged breach occurs.</p>
                                </li>
                                <li>
                                    <p>RIGHT TO OBJECT</p>
                                    <p>IF WE PROCESS YOUR PERSONAL DATA ON THE BASIS OF OUR MAIN LEGITIMATE INTEREST IN THE CONTEXT OF A BALANCING OF INTERESTS, YOU HAVE THE RIGHT AT ANY TIME, FOR REASONS WHICH WE APPLY TO YOUR SPECIFIC SITUATION.</p>
                                    <p>IF YOU MAKE USE OF YOUR RIGHT TO OBJECT, WE WILL END THE PROCESSING OF THE DATA AFFECTED. FURTHER PROCESSING IS RESERVED IF WE CAN PROVE COMPULSORY REASONS FOR THE PROCESSING, THAT ARE OUTSIDE YOUR INTERESTS, FUNDAMENTAL RIGHTS, AND FREEDOMS, OR IF THE PROCESSING OR EXPRESSION APPLIES.</p>
                                    <p>IF YOUR PERSONAL DATA IS PROCESSED BY US FOR DIRECT ADVERTISING, YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF PERSONAL DATA FOR THE PURPOSE OF SUCH ADVERTISING. YOU MAY OBJECT AS DESCRIBED ABOVE.</p>
                                    <p>IF YOU USE YOUR RIGHT TO OBJECT, WE WILL END THE PROCESSING OF THE DATA AFFECTED FOR DIRECT ADVERTISING PURPOSES.</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="mb-3">
                                <p><strong>Duration of storage of personal data</strong></p>
                            </div>
                            <p>The duration of the storage of personal data is determined by the respective legal basis, the purpose of processing, and - if relevant - additionally by the respective legal retention period (e.g. retention periods under commercial and tax law).</p>
                            <p>You can object to the storage and use of your data for this purpose at any time by sending an appropriate message to the person responsible.</p>
                            <p>If there are legal retention periods for data that are processed within the framework of legal or similar obligations based on Art. 6 Para. 1 letter b DSGVO, these data are routinely deleted after the retention periods have expired, provided that they are no longer required for the fulfillment or initiation of a contract and/or we have no justified interest in their further storage.</p>
                            <p>When personal data is processed on the basis of Art. 6 Para. 1 letter f DSGVO, these data are stored until the person concerned exercises his or her right to object in accordance with Art. 21 Para. 1 DSGVO, unless we can prove compelling reasons for processing worthy of protection which outweigh the interests, rights, and freedoms of the person concerned, or the processing serves to assert, exercise, or defend legal claims.</p>
                            <p>When personal data is processed for the purpose of direct advertising on the basis of Art. 6 Para. 1 letter f DSGVO, these data are stored until the data subject exercises his or her right of objection under Art. 21 Para. 2 DSGVO.</p>
                            <p>Unless otherwise stated in the other information in this declaration on specific processing situations, stored personal data will be deleted if they are no longer necessary for the purposes for which they were collected or otherwise processed.</p>
                        </li>
                    </ol>
                </Container>
            </section>
            <Footer />
        </div>
    )
}


export default PrivacyPolicy;