import SalesByTimeAndCategory from "../components/SaleHistory/SalesByTimeAndCategory"
import CardSection from "../components/SaleHistory/CardSection"
import ProductSales from "../components/SaleHistory/ProductSalesSection"
// import SalesAnalytic from "../components/SaleHistory/SalesAnalytic"
import SalesTableSection from "../components/SaleHistory/SalesSection"
import SalesAnalyticSection from "../components/SaleHistory/SalesAnalyticSection"


const SaleHistoryPage = () => {
  return (
    <section className=" h-[750px] overflow-y-auto max-w-8xl px-4 py-6">
   <CardSection />
   <SalesAnalyticSection />
   <SalesTableSection />
   <ProductSales />
   <SalesByTimeAndCategory/>
   </section>
  )
}

export default SaleHistoryPage