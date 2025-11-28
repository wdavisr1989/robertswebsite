import { h } from 'preact';
import style from './style.module.css';

const photographs = (props) => {
	return (
		<div class={style.pageContact}>
			<h1 class={style.pageTitle}>Contact me</h1>
			<div class={style.formWrapper}>
				<p class={style.pageBody}>
					<div>Yo! What's good?</div>
					<div>Looking to book an appointment or have questions about our services? Hit me up using the form below and let's get you scheduled for that fresh cut!</div>
					<div>&nbsp;</div>
					<div>Let's get it! 🔥💈</div>
				</p>
				<form name="contact" method="POST" data-netlify="true" action="/contact/success" data-netlify-honeypot="bot-field">
					<input type="hidden" name="form-name" value="contact" />
					<p>
						<input type="text" name="name" placeholder="Name" required />
					</p>
					<p>
						<input type="email" name="email" placeholder="E-Mail" required />
					</p>
					<p>
						<textarea name="message" placeholder="Message" />
					</p>
					<p>
						<button type="submit">Send</button>
					</p>
				</form>
			</div>
		</div>
	);
};

export default photographs;
