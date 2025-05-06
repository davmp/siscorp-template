import { useState,useEffect} from "react";
import { Button} from "siscorp-ui";

import { addMonths, isWeekend, nextMonday } from "date-fns";
import { BasicDataCard } from "./components/BasicDataCard";
import { NewHiringDataCard } from "./components/NewHiringDataCard";

export default function index() {
  const [dateInclusion, setDateInclusion] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; 
  });
  const [code, setCode] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const [dateContract, setDateContract] = useState("");
  const [dateDocument, setDateDocument] = useState("");
  const [justification, setJustification] = useState("");
  const [nextActive, setNextActive] = useState("");
  const [document, setDocument] = useState("");

  const [totalMonths, setTotalMonths] = useState("");
  const [dateFinalContract, setDateFinalContract] = useState("");
  const [totalContractValue, setTotalContractValue] = useState("");


  const handleYearChange = (selectedYear: number) => {
    setYear(selectedYear);
  };

  useEffect(() => {
    if (dateContract && Number(totalMonths) >= 1 && Number(totalMonths) <= 60) {
      const start = new Date(dateContract);
      let finalDate = addMonths(start, Number(totalMonths));
      if (isWeekend(finalDate)) {
        finalDate = nextMonday(finalDate);
      }
      setDateFinalContract(finalDate.toISOString().split("T")[0]);
    } else {
      setDateFinalContract("");
    }
  }, [dateContract, totalMonths]);
 
  
  return (
    <section className="mx-auto flex flex-col gap-6 pb-6">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Planejamento Orçamentário - Inclusão
      </h1>
      <div className="w-full flex flex-col items-center gap-4 mx-auto">
        <BasicDataCard
          dateInclusion={dateInclusion}
          code={code}
          description={description}
          year={year}
          onChangeDateInclusion={setDateInclusion}
          onChangeCode={setCode}
          onChangeDescription={setDescription}
          onYearChange={handleYearChange}
        />
          <NewHiringDataCard
            dateContract={dateContract}
            dateDocument={dateDocument}
            dateFinalContract={dateFinalContract}
            nextActive={nextActive}
            document={document}
            justification={justification}
            totalMonths={totalMonths}
            totalContractValue={totalContractValue}
            onChangeDateContract={setDateContract}
            onChangeDateDocument={setDateDocument}
            onChangeNextActive={setNextActive}
            onChangeDocument={setDocument}
            onChangeJustification={setJustification}
            onChangeTotalMonths={setTotalMonths}
            onChangeTotalContractValue={setTotalContractValue}
          />
        <div className="w-full flex items-center justify-end gap-2 mt-4">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </div>
    </section>
  );
}
