import LowestSalesTable from './LowestSaleTable';
import UnitsSoldTable from './UnitSoldTable';

const SalesTableSection = () => {
  return (
    <div>
      <div className="mb-10 grid md:grid-cols-2 gap-6  mt-5">
        <UnitsSoldTable />
        <LowestSalesTable />
    </div>
    </div>
  )
}

export default SalesTableSection;
