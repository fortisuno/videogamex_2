import React, { useEffect, useState } from 'react'

const Text = ({n = 1}) => {

	const [Paragraphs, setParagraphs] = useState([])

	useEffect(() => {
		setParagraphs([])
		
		for(let i = 0; i< n; i++) {
			setParagraphs((p) => [...p, (
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias reiciendis omnis accusamus quod iure! Tempora repellat voluptates dolores provident illum praesentium fugiat magnam doloremque eos, possimus repudiandae a. Quo, excepturi unde. Iure aut expedita ab unde sint fugiat, magnam doloribus vero possimus quod rerum odio obcaecati delectus explicabo quis inventore.
				</p>
			)])
		}
	}, [n])

	return (
		<>
			{Paragraphs.map((P) => P)}
		</>
	)
}

export default Text