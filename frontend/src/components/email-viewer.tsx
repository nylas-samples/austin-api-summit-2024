'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { Spinner } from './ui/spinner'
import EmailItem from './ui/EmailItem'

interface EmailViewerProps {
	selectedTool: string
}

export interface IEmail {
	id: string
	senderName: string
	senderInitials: string
	subject: string
	summary: string
	time: string
}

export function EmailViewer({ selectedTool }: EmailViewerProps) {
	const [emailIdx, setEmailIdx] = React.useState(0)

	const [emails, setEmails] = React.useState<IEmail[]>([])
	const [isLoading, setIsLoading] = React.useState(false)

	// React.useEffect(() => {
	// 	setEmailIdx(0)
	// }, [emails])

	const router = useRouter()

	React.useEffect(() => {
		async function fetchEmails() {
			setIsLoading(true) // Start loading

			const limit = selectedTool === 'ollama' ? 2 : 6

			try {
				console.log('Fetching emails')

				const url = `http://localhost:3000/email/vibify-emails?limit=${limit}&llmServiceName=${selectedTool}`

				const response = await fetch(url, {
					credentials: 'include',
				})

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}

				const data = await response.json()

				if (data.redirect) {
					router.push(data.redirect)
					return
				}

				setEmails(data)
			} catch (error) {
				console.error('Failed to fetch emails:', error)
			} finally {
				setIsLoading(false) // Stop loading
			}
		}

		fetchEmails()
	}, [selectedTool, router])

	const viewingEmail = emails?.[emailIdx]
	const hasNextEmail = emailIdx < emails.length - 1
	const hasPreviousEmail = emailIdx > emails.length - 1

	return (
		<>
			{hasPreviousEmail && (
				<button onClick={() => setEmailIdx(emailIdx - 1)}>Previous</button>
			)}
			{isLoading ? (
				<div className="flex justify-center">
					<Spinner />
				</div>
			) : (
				viewingEmail && <EmailItem email={viewingEmail} />
			)}
			{hasNextEmail && (
				<button onClick={() => setEmailIdx(emailIdx + 1)}>Next</button>
			)}
		</>
	)
}
