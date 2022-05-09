import React from 'react'

const Container = ({title, children}) => {
	return (
		<div className="container">
			{
				!!title && (
					<div className="pt-5">
						<h1>{title}</h1>
					</div>
				)
			}
			{children}
		</div>
	)
}

export default Container