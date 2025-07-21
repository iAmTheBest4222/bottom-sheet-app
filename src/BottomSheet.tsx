import React, { useRef, useState, useEffect } from 'react'

type Product = {
  id: number
  name: string
  price: number
  image: string
}

type BottomSheetProps = {
  title: string
  products: Product[]
}

type PointerEvent = React.PointerEvent<HTMLDivElement>

const snapPoints = [80, 320, 600]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function BottomSheet({ title, products }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(snapPoints[0])
  const [target, setTarget] = useState(snapPoints[0])
  const [dragging, setDragging] = useState(false)
  const startY = useRef(0)
  const startSheetY = useRef(0)

  useEffect(() => {
    if (dragging) return
    let anim: number
    function animate() {
      setY(prev => {
        const next = lerp(prev, target, 0.22)
        if (Math.abs(next - target) < 0.5) return target
        anim = requestAnimationFrame(animate)
        return next
      })
    }
    anim = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(anim)
  }, [target, dragging])

  function onPointerDown(e: PointerEvent) {
    setDragging(true)
    startY.current = e.clientY
    startSheetY.current = y
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }
  function onPointerMove(e: globalThis.PointerEvent) {
    const dy = startY.current - e.clientY
    let next = startSheetY.current + dy
    next = Math.max(snapPoints[0], Math.min(snapPoints[2], next))
    setY(next)
  }
  function onPointerUp() {
    setDragging(false)
    let closest = snapPoints[0]
    let minDist = Math.abs(y - snapPoints[0])
    for (let i = 1; i < snapPoints.length; i++) {
      const dist = Math.abs(y - snapPoints[i])
      if (dist < minDist) {
        minDist = dist
        closest = snapPoints[i]
      }
    }
    setTarget(closest)
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
  }
  function goTo(idx: number) {
    setTarget(snapPoints[idx])
  }
  return (
    <div className="fixed left-0 w-full flex justify-center z-50" style={{ bottom: 0 }}>
      <div
        ref={sheetRef}
        className="relative bg-neutral-900 rounded-t-2xl shadow-2xl border-t border-neutral-800 w-full max-w-md mx-auto flex flex-col items-center"
        style={{
          height: 600,
          transform: `translateY(${600 - y}px)`,
          transition: dragging ? 'none' : 'box-shadow 0.2s',
          touchAction: 'none',
        }}
      >
        <div
          className="w-12 h-2 rounded-full bg-neutral-700 mt-2 mb-3 cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          style={{ pointerEvents: dragging ? 'none' : 'auto' }}
        />
        <div className="flex gap-2 mb-2">
          <button onClick={() => goTo(0)} className="px-2 py-1 rounded bg-neutral-800 text-xs">Closed</button>
          <button onClick={() => goTo(1)} className="px-2 py-1 rounded bg-neutral-800 text-xs">Half</button>
          <button onClick={() => goTo(2)} className="px-2 py-1 rounded bg-neutral-800 text-xs">Open</button>
        </div>
        <div className="w-full px-4 pb-4 overflow-y-auto">
          <div className="text-lg font-semibold mb-4 text-neutral-100 text-center">{title}</div>
          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="flex items-center gap-4 bg-neutral-800 rounded-xl p-3">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg border border-neutral-700" />
                <div className="flex-1">
                  <div className="font-medium text-neutral-100">{product.name}</div>
                  <div className="text-sm text-neutral-400">${product.price.toFixed(2)}</div>
                </div>
                <button className="px-3 py-1 rounded bg-neutral-700 text-xs hover:bg-neutral-600">Add</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomSheet 