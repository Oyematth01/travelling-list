export default function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <h2>Packing List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => onToggleItem(item.id)}
            />
            <span>{item.description}</span>
            <span>({item.quantity})</span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}