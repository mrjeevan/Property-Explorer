import PropertySearchForm from "@/components/Properties/PropertySearchForm";
import Properties from "@/components/Properties/Properties";
type Props = {};

async function PropertiesPage({}: Props) {
  return (
    <>
      <div className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8 ">
          <PropertySearchForm />
        </div>
      </div>
      <Properties />
    </>
  );
}

export default PropertiesPage;
