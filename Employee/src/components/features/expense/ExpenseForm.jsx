import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const ExpenseForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    amount: initialData.amount || "",
    category: initialData.category || "",
    description: initialData.description || "",
    date: initialData.date || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter expense title"
      />

      <Input
        label="Amount"
        name="amount"
        type="number"
        step="0.01"
        min="0"
        value={formData.amount}
        onChange={handleChange}
        required
        placeholder="0.00"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category</option>
          <option value="transportation">Transportation</option>
          <option value="meals">Meals</option>
          <option value="accommodation">Accommodation</option>
          <option value="office_supplies">Office Supplies</option>
          <option value="software">Software</option>
          <option value="other">Other</option>
        </select>
      </div>

      <Input
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter expense description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Expense"}
      </Button>
    </form>
  );
};

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  loading: PropTypes.bool,
};

export default ExpenseForm;
