import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { IEmail } from '../email-viewer'

const Envelope = () => {
	const randomAngle = useRef(Math.random() * 40 - 20)
	return (
		<EnvelopeContainer className="envelope" angle={randomAngle.current}>
			<Backing></Backing>
			<img style={{ zIndex: 3 }} src="/letter-front.svg" />
		</EnvelopeContainer>
	)
}

function EmailItem({ email }: { email: IEmail }) {
	const randomAngle = useRef(Math.random() * 40 - 20)

	return (
		<Outer>
			<EnvelopeOuter>
				<Envelope />
			</EnvelopeOuter>
			<Inner angle={randomAngle.current}>
				<FromText>{email.senderName}</FromText>
				<SummaryText>{email.summary}</SummaryText>
			</Inner>
		</Outer>
	)
}

export default EmailItem

const EnvelopeOuter = styled.div`
	position: absolute;
	display: block;
	width: 200px;
	height: 200px;
	left: 0;
	top: 0;
	transform: translate(-50%, -50%);
`

const EnvelopeContainer = styled.div<{ angle: number }>`
	width: 100%;
	height: 100%;
	transform: rotate(${({ angle }) => angle}deg) scale(0.9);

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`

const Backing = styled.div`
	width: 66%;
	height: 66%;
	transform: rotate(45deg);
	margin: auto;
	transform: rotate3d(0, 0, 1, 45deg) skew(-8deg, -8deg);
	position: absolute;
	top: 5%;
	left: 0;
	right: 0;
	border-radius: 13px;
	background: linear-gradient(
		-45deg,
		rgba(238, 174, 202, 1) 0%,
		rgba(148, 187, 233, 1) 100%
	);
`
const Outer = styled.div`
	position: relative;
	width: 400px;
	height: 400px;
	font-family: Courier New, monospace;
	max-width: Calc(100vw - 20px);
	align-items: center;

	.envelope {
	}
`

const Inner = styled.div<{ angle: number }>`
	padding: 40px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	border: 1px solid #f8f8f8;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.13);
	border-radius: 12px;

	z-index: 4;
	position: relative;
	background-color: #fff;
	background-image: url('/paper.png');
	transform: rotate(${({ angle }) => angle}deg) scale(0.85);
	transition: transform 0.15s ease-out;
	&:hover {
		transform: rotate(0deg) scale(1.1);
	}
`

const SummaryText = styled.div`
	font-size: 16px;
	line-height: 24px;
	color: #000;
	margin-top: 10px;
	font-weight: 500;
`

const FromText = styled.div`
	font-size: 20px;
	line-height: 24px;
	font-weight: 600;
	color: #000;
`
