import React, { Component } from "react";
import ReactDOm from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoFairness from '../../assets/images/logo-fairness-90.png'
import Header from '../header/Header';
import AuthHeader from "../authheader/AuthHeader";
import Footer from '../footer/Footer';
import { ENV } from "../../config/config";

const TermsOfUse = (props) => {
    let { customername } = ENV.getUserKeys();
    return (
        <div>
            {customername ? <AuthHeader /> : <Header />}

            <section className="terms-of-use-content">
                <Container>
                    <h2 className="mb-4">
                        General terms and conditions with customer information
                    </h2>
                    <h4 className="mb-4">
                        <strong>Table of Contents</strong>
                    </h4>
                    <ol>
                        <li className="mb-4">
                            <strong> Scope  </strong>
                        </li>
                        <li className="mb-4">
                            <strong>Conclusion of contract</strong>
                        </li>
                        <li className="mb-4">
                            <strong>Purchase on trial</strong>
                        </li>
                        <li className="mb-4">
                            <strong>Right of withdrawal</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Prices and terms of payment</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Terms of delivery and dispatch</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Permission for using digital content</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Permission for using license keys</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Duration and termination of subscription contracts</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Retention of title</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Liability for defects (warranty)</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Redemption of promotion vouchers</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Redemption of product vouchers</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Applicable law</strong>
                        </li>
                        <li className="mb-4">
                            <strong> Place of jurisdiction</strong>
                        </li>
                        <li className="mb-4">
                            <strong>Alternative dispute resolution</strong>
                        </li>
                    </ol>
                    <div>
                        <h4 className="mb-4">
                            <strong>1) Scope</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p>These General Terms and Conditions (hereinafter referred to as "GTC") of TIMmunity GmbH (hereinafter referred to as "seller") apply to all contracts for the delivery of goods which a consumer or entrepreneur (hereinafter referred to as "customer") concludes with the seller regarding the goods displayed by the seller in his or her online shop. The inclusion of the customer's own terms and conditions is hereby rejected, unless otherwise agreed.</p>
                            </li>
                            <li>
                                <p>For contracts for the delivery of digital content, these GTC shall apply accordingly, unless otherwise expressly agreed.</p>
                            </li>
                            <li>
                                <p> For contracts for the delivery of vouchers, these GTC shall apply accordingly, unless expressly agreed otherwise.</p>
                            </li>
                            <li>
                                <p>These GTC shall apply accordingly to contracts for the delivery of license keys, unless expressly provided otherwise. The Seller shall provide a license key for the use of the software or contents described by him and shall give the contractually agreed rights to use the respective software or contents. The customer does not acquire any intellectual property rights to the software or content. The respective product description in the seller's online shop is decisive for the quality of the software or content.</p>
                            </li>
                            <li>
                                <p>A consumer in the sense of these GTC is any natural person who enters into a legal transaction for purposes that are predominantly neither commercial nor their independent professional activity. Entrepreneur in the sense of these GTC is a natural or legal person or a partnership with legal capacity, which acts in exercise of its commercial or independent professional activity when concluding a legal transaction.</p>
                            </li>
                            <li>
                                <p>Digital contents in the sense of these GTC are all data not contained on a physical data carrier, which are produced in digital form and provided by the Seller under the provision of certain rights of use regulated in more detail in these GTC.</p>
                            </li>
                            <li>
                                <p>The subject matter of the contract may - depending on the Seller's product description - be the purchase of goods by way of a one-time delivery or the purchase of goods by way of a permanent delivery (hereinafter "Subscription Contract"). In the case of a subscription contract, the Seller undertakes to deliver the contractually owed goods to the Customer for the duration of the agreed contract period at the time intervals contractually owed.</p>
                            </li>
                            <li>
                                <p>Components of the Seller's product range presented may - depending on the Seller's product description - be associated with the conclusion of a contract for the provision of telecommunication services (hereinafter "Telecommunication Contract") with a third party provider (hereinafter "Service Provider"). In this case, the existence of the contract with the Seller depends on the conclusion of a telecommunications contract with the service provider and on the fact that the telecommunications contract is not revoked by the Customer. The telecommunications contract shall be subject to the relevant statutory provisions and any contractual terms and conditions of the respective service provider that deviate from these. The Seller acts merely as an intermediary for such contracts.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>2) Conclusion of contract</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p>The product descriptions contained in the seller's online shop do not represent binding offers on the part of the seller, but serve to provide a binding offer by the customer.</p>
                            </li>
                            <li>
                                <p>The customer can submit the offer using the online order form integrated into the seller's online shop. After placing the selected goods in the virtual shopping cart and going through the electronic ordering process, the customer submits a legally binding contractual offer with regard to the goods contained in the shopping cart by clicking the button concluding the ordering process. Furthermore, the customer can also submit the offer to the seller by e-mail or by online contact form.</p>
                            </li>
                            <li>
                                <p>  The seller can accept the customer's offer within five days,</p>
                                <div>
                                    <p>- by sending the customer a written order confirmation or an order confirmation in text form (fax or e-mail), whereby the receipt of the order confirmation by the customer is decisive, or</p>

                                    <p>- by delivering the ordered goods to the customer, whereby the receipt of the goods by the customer is decisive, or</p>

                                    <p>- by requesting the customer to pay after placing his order.</p>
                                </div>
                                <p>If there are several of the aforementioned alternatives, the contract is concluded at the time when one of the aforementioned alternatives occurs first. The period for acceptance of the offer begins on the day after the customer sends the offer and ends with the expiry of the fifth day following the sending of the offer. If the Seller does not accept the Customer's offer within the aforementioned period, this shall be deemed a rejection of the offer with the consequence that the Customer is no longer bound by his declaration of intent.</p>
                            </li>
                            <li>
                                <p>If a payment method offered by PayPal is selected, the payment will be processed by the payment service provider PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg (hereinafter referred to as "PayPal"), subject to the PayPal Terms of Use, available at <a className="lengthy-content" href="https://www.paypal.com/de/webapps/mpp/ua/useragreement-full">https://www.paypal.com/de/webapps/mpp/ua/useragreement-full</a> or - if the Customer does not have a PayPal account - subject to the Terms for payments without a PayPal account, available at <a className="lengthy-content" href="https://www.paypal.com/de/webapps/mpp/ua/privacywax-full">https://www.paypal.com/de/webapps/mpp/ua/privacywax-full</a>. If the customer pays by means of a method of payment offered by PayPal, which can be selected in the online order process, the seller declares the acceptance of the customer's offer at the moment the customer clicks on the button completing the order process.</p>
                            </li>
                            <li>
                                <p>If the payment method "Amazon Payments" is selected, payment shall be processed via the payment service provider Amazon Payments Europe s.c.a., 38 avenue John F. Kennedy, L-1855 Luxembourg (hereinafter referred to as "Amazon"), subject to the Amazon Payments Europe User Agreement, which can be viewed at <a className="lengthy-content" href="https://payments.amazon.de/help/201751590">https://payments.amazon.de/help/201751590</a>. If the customer selects "Amazon Payments" as the payment method within the scope of the online order process, he shall also issue a payment order to Amazon at the same time by clicking the button concluding the order process. In this case, the seller hereby declares acceptance of the customer's offer at the point in time when the customer initiates the payment transaction by clicking the button concluding the order process.</p>
                            </li>
                            <li>
                                <p> When submitting an offer via the seller's online order form, the text of the contract is saved by the seller after the conclusion of the contract and sent to the customer in text form (e.g. e-mail, fax or letter) after the customer has sent off his order. The Seller shall not make the text of the contract accessible beyond this.</p>
                            </li>
                            <li>
                                <p>Before the binding submission of the order via the Seller's online order form, the Customer can identify possible input errors by carefully reading the information displayed on the screen. An effective technical means for better recognition of input errors can be the enlargement function of the browser, with the help of which the display on the screen is enlarged. Within the electronic ordering process, the customer can correct his entries using the usual keyboard and mouse functions until he clicks on the button that concludes the ordering process.</p>
                            </li>
                            <li>
                                <p>The German and English languages are available for the conclusion of the contract.</p>
                            </li>
                            <li>
                                <p> The order processing and contact are usually carried out by e-mail and automated order processing. The customer must ensure that the e-mail address provided by him for order processing is correct so that the e-mails sent by the seller can be received at this address. In particular, when using SPAM filters, the customer must ensure that all e-mails sent by the seller or by third parties commissioned by the seller to process the order can be delivered.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>3)Purchase on trial</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p>If the option "order on approval" (purchase on approval) is selected, the contract is concluded under the condition that the customer approves the ordered goods within a period of fourteen days by express declaration (e.g. a letter, fax or e-mail sent by post) to the seller or that the customer does not reject the already delivered goods within a period of fourteen days by express declaration (e.g. a letter, fax or e-mail sent by post) to the seller. The approval period begins on the day after the customer receives the goods.</p>
                            </li>
                            <li>
                                <p>During the approval period, the customer is entitled to inspect the goods delivered to him with regard to condition, properties and functionality and to store them for these purposes. In doing so, he must treat the goods with care with regard to a possible obligation to return them. If the customer uses the goods in a way that is not necessary to check their condition, properties and functionality, he shall be liable for any loss of value of the goods.</p>
                            </li>
                            <li>
                                <p>  If the customer declares his approval of the goods within the approval period or if he does not reject the goods within the approval period, he is obliged to pay the seller the agreed purchase price. In this case, the Buyer shall transfer the agreed purchase price to the Seller's bank account without delay, but at the latest within a period of seven days, unless otherwise agreed. The payment period shall commence on the day following the customer's declaration of approval or - in the absence of express approval - on the day following the expiry of the approval period. Timely receipt of payment in the Seller's bank account shall be decisive for compliance with the time limit.</p>
                            </li>
                            <li>
                                <p>If the Customer declares its rejection of the goods within the approval period, it shall return the goods to the Seller at its own expense within a period of seven days, unless otherwise agreed. The period for returning the goods begins on the day after the customer's declaration of rejection. Timely dispatch of the goods by the customer is sufficient to comply with the deadline. The customer must use suitable transport packaging to avoid transport damage.</p>
                            </li>
                            <li>
                                <p> If the customer culpably violates his duty of care and/or return, he is obliged to compensate the seller for the resulting damage.</p>
                            </li>
                            <li>
                                <p> The customer's statutory right of revocation shall not be affected by the aforementioned provisions.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>4)Right of withdrawal</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p>Consumers are generally entitled to a right of withdrawal.</p>
                            </li>
                            <li>
                                <p> More detailed information on the right of revocation is contained in the seller's revocation instructions.</p>
                            </li>
                            <li>
                                <p>The right of revocation does not apply to consumers who do not belong to a member state of the European Union at the time of conclusion of the contract and whose sole residence and delivery address are outside the European Union at the time of conclusion of the contract.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>5) Prices and terms of payment</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p>Unless otherwise stated in the Seller's product description, the prices quoted are total prices which include the statutory value added tax. Any additional delivery and shipping costs that may be incurred shall be stated separately in the respective product description.</p>
                            </li>
                            <li>
                                <p> In the case of deliveries to countries outside the European Union, additional costs may be incurred in individual cases for which the seller is not responsible and which are to be borne by the customer. These include, for example, costs for money transfer through credit institutions (e.g. transfer fees, exchange rate fees) or import duties or taxes (e.g. customs duties). Such costs may also be incurred in relation to the transfer of money if the delivery is not to a country outside the European Union, but the customer makes the payment from a country outside the European Union.</p>
                            </li>
                            <li>
                                <p> The customer will be informed of the payment option(s) in the seller's online shop.</p>
                            </li>
                            <li>
                                <p>If advance payment by bank transfer has been agreed upon, payment is due immediately after conclusion of the contract, unless the parties have agreed upon a later due date.</p>
                            </li>
                            <li>
                                <p> If the payment method "PayPal Credit" (payment in installments via PayPal) is selected, the seller assigns his payment claim to PayPal. Before accepting the Seller's declaration of assignment, PayPal shall carry out a credit assessment using the customer data provided. The seller reserves the right to refuse the customer the payment method "PayPal Credit" in case of a negative check result. If the payment method "PayPal Credit" is permitted by PayPal, the customer must pay the invoice amount to PayPal under the conditions set by the seller and communicated to him/her in the seller's online shop. In this case he can only pay to PayPal with debt discharging effect. However, even in the case of assignment of claims, the seller remains responsible for general customer inquiries, e.g. regarding the goods, delivery time, dispatch, returns, complaints, declarations of revocation and shipments or credit notes.</p>
                            </li>
                            <li>
                                <p>If the payment method "IMMEDIATELY" is selected, the payment processing is carried out by the payment service provider SOFORT GmbH, Theresienhöhe 12, 80339 Munich, Germany (hereinafter "IMMEDIATELY"). In order to be able to pay the invoice amount via "IMMEDIATELY", the customer must have an online banking account that has been activated for participation in "IMMEDIATELY", must identify himself accordingly during the payment process and confirm the payment instruction to "IMMEDIATELY". The payment transaction will be executed immediately afterwards by "IMMEDIATELY" and the customer's bank account will be debited. Further information on the "IMMEDIATE" payment method can be found on the Internet at <a href="https://www.klarna.com/sofort/">https://www.klarna.com/sofort/</a>.</p>
                            </li>
                            <li>
                                <p>If a payment method offered through the payment service "Mollie Payments" is selected, the payment transaction will be processed by the payment service provider Mollie B.V., Keizersgracht 313, 1016 EE Amsterdam, Netherlands. (Hereinafter "Mollie"). The individual payment methods offered via Mollie Payments are communicated to the customer in the online shop of the seller. For the processing of payments, Mollie may make use of other payment services, for which special payment conditions may apply, to which the customer will be informed separately if necessary. Further information on "Mollie Payments" is available on the Internet at <a className="lengthy-content" href="https://www.mollie.com/legal/terms-payments-de">https://www.mollie.com/legal/terms-payments-de</a>.</p>
                            </li>
                            <li>
                                <p> If a payment method offered via the "mollie" payment service is selected, the payment is processed via the payment service provider Mollie B.V., Keizersgracht 313, 1016 EE Amsterdam, Netherlands (hereinafter referred to as "mollie"). The individual payment methods offered via mollie are communicated to the customer in the online shop of the seller. For the processing of payments, mollie may make use of other payment services for which special payment conditions may apply, to which the customer will be informed separately if necessary. Further information about "mollie" is available on the Internet at <a href="https://www.mollie.com/">https://www.mollie.com/</a>.</p>
                            </li>
                            <li>
                                <p> If the payment method invoice purchase is selected, the purchase price is due after the goods have been delivered and invoiced. In this case, the purchase price is payable within 7 (seven) days of receipt of the invoice without deduction, unless otherwise agreed. The Seller reserves the right to offer the payment method Invoice Purchase only up to a certain order volume and to reject this payment method if the specified order volume is exceeded. In this case, the seller will inform the customer of a corresponding payment restriction in his payment information in the online shop.</p>
                            </li>
                            <li>
                                <p>If the payment method Invoice Purchase is selected, the purchase price is due after the goods have been delivered and invoiced. In this case, the purchase price is payable within 7 (seven) days of receipt of the invoice without deduction, unless otherwise agreed. The Seller reserves the right to offer the payment method Invoice Purchase only up to a certain order volume and to reject this payment method if the specified order volume is exceeded. In this case, the seller will inform the customer of a corresponding payment restriction in his payment information in the online shop. Furthermore, the seller reserves the right to carry out a credit check when selecting the payment method "purchase on account" and to reject this payment method if the credit check is negative.</p>
                            </li>
                            <li>
                                <p> When choosing the payment method "PayPal invoice", the seller assigns his payment claim to PayPal. Before accepting the seller's declaration of assignment, PayPal will carry out a credit check using the customer data provided. The seller reserves the right to refuse the customer the payment method "PayPal invoice" in case of a negative check result. If the payment method "PayPal Invoice" is permitted by PayPal, the customer shall pay the invoice amount to PayPal within 30 days of receipt of the goods, unless PayPal has given the customer a different payment term. In this case he can only pay to PayPal with debt discharging effect. However, even in the case of assignment of claims, the seller remains responsible for general customer inquiries, e.g. regarding the goods, delivery time, shipment, returns, complaints, declarations of revocation and shipments or credit notes. In addition, the General Terms of Use for the use of the purchase on account of PayPal, available at <a className="lengthy-content" href="https://www.paypal.com/de/webapps/mpp/ua/pui-terms">https://www.paypal.com/de/webapps/mpp/ua/pui-terms</a>.</p>
                            </li>
                            <li>
                                <p>f the payment method "PayPal Direct Debit" is selected, PayPal shall collect the invoice amount from the Customer's bank account after a SEPA Direct Debit mandate has been issued, but not before the expiry of the period for advance information on behalf of the Seller. Pre-notification is any communication (e.g. invoice, policy, contract) to the customer announcing a debit by SEPA Direct Debit. If the direct debit is not honored due to insufficient funds in the account or due to the provision of incorrect bank details, or if the customer objects to the debit although he is not entitled to do so, the customer shall bear the fees arising from the chargeback by the respective bank if he is responsible for this.</p>
                            </li>
                            <li>
                                <p> If the payment method Direct Debit via Mollie is selected, the payment will be processed via the payment service provider Mollie B.V., Keizersgracht 313, 1016 EE Amsterdam, the Netherlands (hereinafter referred to as "Mollie"). In this case, Mollie will collect the invoice amount from the customer's bank account on behalf of the seller after a SEPA Direct Debit Mandate has been issued, but not before the expiry of the deadline for advance information. Pre-notification is any communication (e.g. invoice, policy, and contract) to the customer announcing a debit by SEPA Direct Debit. If the direct debit is not honored due to insufficient funds in the account or due to the provision of incorrect bank details, or if the customer objects to the debit although he is not entitled to do so, the customer shall bear the fees arising from the chargeback by the respective bank if he is responsible for this. The Seller reserves the right to carry out a credit check when selecting the SEPA direct debit payment method and to reject this payment method if the credit check is negative.</p>
                            </li>
                            <li>
                                <p> If the credit card payment method via Mollie is selected, the invoice amount is due immediately upon conclusion of the contract. Payment is processed by the payment service provider Mollie B.V., Keizersgracht 313, 1016 EE Amsterdam, Netherlands (hereinafter referred to as "Mollie"). Mollie reserves the right to carry out a credit check and to reject this payment method if the credit check is negative.</p>
                            </li>
                            <li>
                                <p> If a payment method offered via the "Klarna" payment service is selected, the payment will be processed by Klarna Bank AB (publ), Sveavägen 46, 111 34 Stockholm, Sweden (hereinafter "Klarna"). For further information and Klarna's terms and conditions, please refer to the Seller's payment information, which is available at the following Internet address <a href="https://www.klarna.com/">https://www.klarna.com/</a></p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>6) Delivery and shipping conditions</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p>The delivery of goods shall be made by dispatch to the delivery address indicated by the customer, unless otherwise agreed. The delivery address indicated in the Seller's order processing is decisive for the transaction.</p>
                            </li>
                            <li>
                                <p> In the case of goods delivered by a forwarding agent, delivery shall be "free kerbside", i.e. to the public kerbside nearest to the delivery address, unless otherwise stated in the shipping information in the Seller's online shop and unless otherwise agreed.</p>
                            </li>
                            <li>
                                <p> If the delivery of the goods fails for reasons for which the customer is responsible, the customer shall bear the reasonable costs incurred by the seller as a result. This does not apply with regard to the costs for the return shipment if the customer effectively exercises his right of revocation. In the event that the customer effectively exercises his right of revocation, the provision made in the seller's revocation instruction shall apply to the costs of return shipment.</p>
                            </li>
                            <li>
                                <p>Collection by the customer is not possible for logistical reasons.</p>
                            </li>
                            <li>
                                <p>  Vouchers are provided to the customer as follows:</p>
                                <ul className="list-unstyled">
                                    <li>- by download</li>
                                    <li>- by email</li>
                                    <li>- by mail</li>
                                </ul>
                            </li>
                            <li>
                                <p>License keys are provided to the customer as follows:</p>
                                <ul className="list-unstyled">
                                    <li>- by download</li>
                                    <li>- by email</li>
                                    <li>- by mail</li>
                                    <li>- via display on the screen</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>7) Permission for using digital content</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p>Unless otherwise stated in the DeepL description in the Seller's online shop, the Seller gives the Customer the non-exclusive right to use the content provided for private and business purposes, unlimited in terms of time and place.</p>
                            </li>
                            <li>
                                <p> The transfer of the contents to third parties or the creation of copies for third parties outside the scope of these GTC is not permitted unless the seller has agreed to a transfer of the contractual license to the third party.</p>
                            </li>
                            <li>
                                <p>  The given consent of rights shall only become effective when the customer has paid the contractually owed remuneration in full. The Seller may also provisionally permit the use of the contractual contents even before this time. Such provisional permission does not constitute a transfer of rights.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>8) Permission for using license keys</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p> The license key provided entitles the customer to use the software or contents of the respective product description to the extent described therein.</p>
                            </li>
                            <li>
                                <p> The given consent of rights only becomes effective when the customer has paid the remuneration owed in full.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>9) Duration and termination of the contract for subscription contracts</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p> Subscription contracts are concluded for a limited period of time, for the contract period shown in the respective product description in the seller's online shop and end automatically after the contract period has expired.</p>
                            </li>
                            <li>
                                <p> The right to extraordinary termination for good cause remains unaffected. A good cause shall be deemed to exist if the terminating party cannot reasonably be expected to continue the contractual relationship until the agreed termination or until the expiry of a notice period, taking into account all circumstances of the individual case and weighing the interests of both parties.</p>
                            </li>
                            <li>
                                <p> Notice of termination must be given in writing or in text form (e.g. by e-mail).</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>10) Retention of title</strong>
                        </h4>
                        <p>If the seller makes advance payment, he reserves the right of ownership of the delivered goods until full payment of the purchase price owed.</p>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>11) Liability for defects (warranty)</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p> If the purchased item is defective, the provisions of the statutory liability for defects shall apply.</p>
                            </li>
                            <li>
                                <p>  Deviating from this applies to used goods: Warranty claims are excluded if the defect only occurs after one year from delivery of the goods. Defects that occur within one year of delivery of the goods can be claimed within the statutory limitation period. However, the reduction of the liability period to one year shall not apply</p>
                                <ul className="list-unstyled">
                                    <li>
                                        <p>- for items which have been used for a building in accordance with their normal use and have caused its defectiveness,</p>
                                    </li>
                                    <li>
                                        <p>- for claims for damages and reimbursement of expenses of the customer, and</p>
                                    </li>
                                    <li>
                                        <p>- in the event that the seller has fraudulently concealed the defect.</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p> The customer is requested to complain about delivered goods with obvious transport damages to the deliverer and to inform the seller about it. If the customer does not comply with this, this has no effect on his legal or contractual claims for defects.</p>
                            </li>
                            <li>
                                <p> The seller is not liable for defects in the execution of the telecommunication contract, for which the respective service provider is exclusively responsible. In this respect, the relevant statutory provisions shall apply as well as any contractual terms and conditions of the respective service provider that deviate from these.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4">
                            <strong>12) Redemption of promotion vouchers</strong>
                        </h4>
                        <ul className="custom-padding">
                            <li>
                                <p> Vouchers which are issued free of charge by the Seller within the scope of advertising campaigns with a certain period of validity and which cannot be purchased by the Customer (hereinafter "campaign vouchers") can only be redeemed in the Seller's online shop and only within the specified period.</p>
                            </li>
                        </ul>
                    </div>
                </Container>
            </section>
            <Footer />
        </div>
    )
}


export default TermsOfUse;