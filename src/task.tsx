import {
	FC,
	memo,
	MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

type Mode = 'add' | 'remove'

const useRenderCounter = () => {
	const counter = useRef(0)
	counter.current++

	return counter.current
}

type RenderCountProps = {
	count: number
	label: string
}

const RenderCountLabel: FC<RenderCountProps> = memo(({ count, label }) => {
	return (
		<div>
			{label} renders: <span style={{ color: 'red' }}>{count}</span>
		</div>
	)
})

// const AddToEndButton = ({ onClick }: { onClick: () => void }) => {
// 	const counter = useRenderCounter()
// 	return (
// 		<div className='button'>
// 			<button onClick={onClick}>Add to end</button>
// 			<RenderCountLabel label='Button' count={counter} />
// 		</div>
// 	)
// }

// const AddToStartButton = ({ onClick }: { onClick: () => void }) => {
// 	const counter = useRenderCounter()
// 	return (
// 		<div>
// 			<button onClick={onClick}>Add to start</button>
// 			<RenderCountLabel label='Button' count={counter} />
// 		</div>
// 	)
// }

// const ChangeModeButton = ({
// 	action,
// 	onClick,
// }: {
// 	action: Mode
// 	onClick: () => void
// }) => {
// 	const counter = useRenderCounter()
// 	return (
// 		<div>
// 			<button onClick={onClick}>change mode: {action}</button>
// 			<RenderCountLabel label='Button' count={counter} />
// 		</div>
// 	)
// }

type CustomBtnProps = {
	title: string
	onClick: () => void
}

const CustomButton: FC<CustomBtnProps> = memo(({ title, onClick }) => {
	const counter = useRenderCounter()
	return (
		<div>
			<button onClick={onClick}>{title}</button>
			<RenderCountLabel label='Button' count={counter} />
		</div>
	)
})

type ListItemProps = {
	item: string
	onRemove: (item: string) => void
}

const ListItem: FC<ListItemProps> = ({ item, onRemove }) => {
	const onClick = (event: MouseEvent<HTMLLIElement>) => {
		event.currentTarget.classList.remove('li-item')
		void event.currentTarget.offsetWidth
		event.currentTarget.classList.add('li-item')
	}

	const remove = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onRemove(item)
	}

	return (
		<li onClick={onClick} className='li-item'>
			{item}
			<button className='btn-remove' onClick={remove}>
				x
			</button>
		</li>
	)
}

const List = () => {
	const counter = useRenderCounter()
	const index = useRef(0)

	const [items, setItems] = useState<string[]>([])
	const [action, setAction] = useState<Mode>('add')

	const addItem = useCallback((place: 'start' | 'end') => {
		index.current++
		switch (place) {
			case 'start':
				setItems(prev => [`${index.current}-item`, ...prev])

				break
			case 'end':
				setItems(prev => [...prev, `${index.current}-item`])

				break
		}
	}, [])

	const handleChangeAction = useCallback(() => {
		setAction(prev => (prev === 'add' ? 'remove' : 'add'))
	}, [])

	const handleRemoveItem = useCallback((item?: string) => {
		if (item) {
			setItems(prev => prev.filter(i => i !== item))
		} else {
			setItems(prev =>
				prev.length > 0 ? prev.slice(0, prev.length - 1) : prev
			)
		}
	}, [])

	const handleAddItem = useCallback(() => {
		addItem('end')
	}, [addItem])

	const handleAddToStart = useCallback(() => {
		addItem('start')
	}, [addItem])

	useEffect(() => {
		const id = setTimeout(
			() => (action === 'add' ? handleAddItem() : handleRemoveItem()),
			1000
		)

		return () => {
			clearTimeout(id)
		}
	})

	return (
		<ul className='list'>
			<RenderCountLabel label='List' count={counter} />
			<br />
			<CustomButton
				title={`change mode: ${action}`}
				onClick={handleChangeAction}
			/>
			<br />
			<div className='btn-actions'>
				<CustomButton title={'Add to start'} onClick={handleAddToStart} />
				<CustomButton title={'Add to end'} onClick={handleAddItem} />
			</div>
			{items.map(item => (
				<ListItem item={item} onRemove={handleRemoveItem} key={item} />
			))}
		</ul>
	)
}

function App() {
	return (
		<div>
			<List />
		</div>
	)
}

export default App
