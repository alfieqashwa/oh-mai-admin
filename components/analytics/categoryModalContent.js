import { SwitchOnOff } from './switch'

export function AddCategoryContent() {

  return (
    <div className="py-8">
      {categories.map(c => (
        <div key={c.id} className="flex items-center justify-between mt-4">
          <h5 className="uppercase whitespace-nowrap text-N0 w250">{c.name}</h5>
          <SwitchOnOff title="Category Setting" isEnabled={c.isEnabled} />
        </div>
      ))}
    </div>
  );
}


const categories = [
  { id: 1, name: "orders", isEnabled: true },
  { id: 2, name: "gross sales", isEnabled: true },
  { id: 3, name: "net sales", isEnabled: true },
  { id: 4, name: "refunds", isEnabled: true },
  { id: 5, name: "average order value", isEnabled: true },
  { id: 6, name: "kol orders", isEnabled: false },
  { id: 7, name: "non-kol orders", isEnabled: false },
  { id: 8, name: "successful orders", isEnabled: false },
  { id: 9, name: "refunds", isEnabled: false },
  { id: 11, name: "commissions", isEnabled: false },
  { id: 12, name: "items sold", isEnabled: false },
  { id: 13, name: "shipping", isEnabled: false },
  { id: 14, name: "gateway fees", isEnabled: false },
]