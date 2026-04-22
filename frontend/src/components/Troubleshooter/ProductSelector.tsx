import { Wifi, Zap, Router } from 'lucide-react'

const products = [
  {
    id: 'wibronix',
    name: 'Wibronix',
    badge: 'LTE',
    icon: Wifi,
    description: 'LTE wireless broadband · SIM-based',
  },
  {
    id: 'gpon',
    name: 'GPON Fiber',
    badge: 'FIBRE',
    icon: Zap,
    description: 'Fiber optic connection · High speed',
  },
  {
    id: 'lte-box',
    name: 'LTE Box',
    badge: 'ROUTER',
    icon: Router,
    description: 'Wireless router · WiFi enabled',
  },
  {
    id: 'router',
    name: 'Router',
    badge: 'DEVICE',
    icon: Wifi,
    description: 'Network router · Configure network',
  },
]

export default function ProductSelector() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-surface-900 mb-2">Start Troubleshooting Session</h2>
      <p className="text-surface-600 text-sm mb-6">Click a product to open the guided troubleshooter</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const Icon = product.icon
          return (
            <button
              key={product.id}
              className="bg-white rounded-lg shadow-sm p-6 border border-surface-200 hover:shadow-md hover:border-primary-300 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded">
                  {product.badge}
                </span>
              </div>
              <h3 className="font-semibold text-surface-900 mb-1">{product.name}</h3>
              <p className="text-sm text-surface-600">{product.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
