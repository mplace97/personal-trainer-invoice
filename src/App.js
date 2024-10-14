import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Stili per il PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#FF6F00", // Arancione
    color: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 22,
    textAlign: "right",
    marginVertical: 20,
  },
  infoSection: {
    marginBottom: 20,
    textAlign: "right",
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  tableCell: {
    padding: 5,
    flex: 1,
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  tableCellLast: {
    padding: 5,
    flex: 1,
    fontSize: 12,
  },
  footer: {
    fontSize: 12,
    marginTop: 20,
    textAlign: "center",
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clientInfo: {
    textAlign: "right",
    fontSize: 12,
  },
});

// Componente per il PDF
const InvoicePDF = ({ trainerData, clientData, services }) => {
  const logoUrl = "/dumbbell.png"; // Sostituisci con il percorso reale del tuo logo

// Calcolo dell'imponibile e dell'IVA
const ivaPercentage = 0.10; // 10% di IVA
const imponibile = services.reduce((total, service) => {
  const unitPriceWithoutVAT = service.unitPrice / (1 + ivaPercentage); // Prezzo senza IVA
  return total + service.quantity * unitPriceWithoutVAT;
}, 0);
const iva = imponibile * ivaPercentage;
const totale = imponibile + iva; // Totale è uguale al prezzo finale già incluso di IVA


  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <View>
            <Text style={pdfStyles.headerText}>Nome Trainer: {trainerData.name}</Text>
            <Text style={pdfStyles.headerText}>Indirizzo: {trainerData.address}</Text>
            <Text style={pdfStyles.headerText}>P.IVA: {trainerData.vatNumber}</Text>
          </View>
          <Image style={pdfStyles.logo} src={logoUrl} />
        </View>

        <View style={pdfStyles.titleContainer}>
          <Text style={pdfStyles.title}>FATTURA</Text>
        </View>

        <View style={pdfStyles.infoSection}>
          <Text>Numero Fattura: {trainerData.invoiceNumber}</Text>
          <Text>Data Fattura: {trainerData.invoiceDate}</Text>
          <Text>Studio: {trainerData.studioName}</Text>
          <Text>Indirizzo Studio: {trainerData.studioAddress}</Text>
          <Text>P.IVA Studio: {trainerData.studioVatNumber}</Text>
        </View>

        <View style={pdfStyles.table}>
        <View style={pdfStyles.tableRow}>
          <Text style={pdfStyles.tableCell}>Quantità</Text>
          <Text style={pdfStyles.tableCell}>Descrizione</Text>
          <Text style={pdfStyles.tableCell}>Prezzo unitario (inclusa IVA)</Text>
          <Text style={pdfStyles.tableCell}>IVA (scorporata)</Text>
          <Text style={pdfStyles.tableCell}>Importo</Text>
        </View>
        {services.map((service, index) => {
          const unitPriceWithoutVAT = service.unitPrice / (1 + ivaPercentage);
          const ivaAmount = service.unitPrice - unitPriceWithoutVAT;
          return (
            <View style={pdfStyles.tableRow} key={index}>
              <Text style={pdfStyles.tableCell}>{service.quantity}</Text>
              <Text style={pdfStyles.tableCell}>{service.description}</Text>
              <Text style={pdfStyles.tableCell}>
                {service.unitPrice.toFixed(2)} €
              </Text>
              <Text style={pdfStyles.tableCell}>
                {ivaAmount.toFixed(2)} €
              </Text>
              <Text style={pdfStyles.tableCellLast}>
                {(service.quantity * service.unitPrice).toFixed(2)} €
              </Text>
            </View>
          );
        })}
</View>

        <View style={pdfStyles.bottomRow}>
          <View>
            <Text>Imponibile: {imponibile.toFixed(2)} €</Text>
            <Text>Totale IVA (10%): {iva.toFixed(2)} €</Text>
            <Text style={{ fontWeight: "bold" }}>Totale: {totale.toFixed(2)} €</Text>
          </View>
          <View style={pdfStyles.clientInfo}>
            <Text>Nome Cliente: {clientData.name}</Text>
            <Text>Indirizzo: {clientData.address}</Text>
          </View>
        </View>

        <Text style={pdfStyles.footer}>Coordinate Bancarie: {trainerData.bankAccount}</Text>
      </Page>
    </Document>
  );
};

// Stili per il form
const formStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  formGroup: {
    width: '100%',
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonAdd: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  buttonDownload: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    textAlign: 'center',
  },
};

const mobileStyles = {
  '@media (max-width: 600px)': {
    formGroup: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    label: {
      fontSize: '14px',
    },
    input: {
      fontSize: '14px',
      padding: '8px',
    },
    buttonAdd: {
      fontSize: '14px',
      padding: '8px 15px',
    },
    buttonDownload: {
      fontSize: '14px',
      padding: '8px 15px',
    },
  },
};


// Form per inserire i dati del trainer, cliente e dei servizi
const TrainerForm = () => {
  const [trainerData, setTrainerData] = useState({
    name: "",
    address: "",
    vatNumber: "",
    studioName: "",
    studioAddress: "",
    studioVatNumber: "",
    invoiceNumber: "",
    invoiceDate: "",
    bankAccount: "",
  });

  const [clientData, setClientData] = useState({
    name: "",
    address: "",
    vatNumber: "",
  });

  const [services, setServices] = useState([{ description: "", quantity: 0, unitPrice: 0 }]);

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    if (field === "unitPrice") {
      newServices[index][field] = parseFloat(value) || 0;
    } else {
      newServices[index][field] = value;
    }
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { description: "", quantity: 0, unitPrice: 0 }]);
  };

  return (
    <div style={{ ...formStyles.container, ...mobileStyles.container }}>
      <h2>Inserisci i dati del trainer</h2>
  
      <div style={formStyles.formGroup}>
  <label style={formStyles.label}>Nome Trainer</label>
  <input
    style={formStyles.input}
    type="text"
    value={trainerData.name}
    onChange={(e) => setTrainerData({ ...trainerData, name: e.target.value })}
  />
</div>

  <div style={formStyles.formGroup}>
    <label style={formStyles.label}>Indirizzo Trainer</label>
    <input
      style={formStyles.input}
      type="text"
      value={trainerData.address}
      onChange={(e) => setTrainerData({ ...trainerData, address: e.target.value })}
    />
  </div>

  {/* Campo per la Partita IVA del Trainer */}
  <div style={formStyles.formGroup}>
    <label style={formStyles.label}>Partita IVA Trainer</label>
    <input
      style={formStyles.input}
      type="text"
      value={trainerData.vatNumber} // Assuming vatNumber is the key for Partita IVA in trainerData
      onChange={(e) => setTrainerData({ ...trainerData, vatNumber: e.target.value })}
    />
  </div>

      {/* Campo per il Numero Fattura */}
    <div style={formStyles.formGroup}>
      <label style={formStyles.label}>Numero Fattura</label>
      <input
        style={formStyles.input}
        type="text"
        value={trainerData.invoiceNumber}
        onChange={(e) => setTrainerData({ ...trainerData, invoiceNumber: e.target.value })}
      />
    </div>

    {/* Campo per la Data Fattura */}
    <div style={formStyles.formGroup}>
      <label style={formStyles.label}>Data Fattura</label>
      <input
        style={formStyles.input}
        type="date"
        value={trainerData.invoiceDate}
        onChange={(e) => setTrainerData({ ...trainerData, invoiceDate: e.target.value })}
      />
    </div>

    {/* Campo per il Nome Studio */}
  <div style={formStyles.formGroup}>
    <label style={formStyles.label}>Nome Studio</label>
    <input
      style={formStyles.input}
      type="text"
      value={trainerData.studioName}
      onChange={(e) => setTrainerData({ ...trainerData, studioName: e.target.value })}
    />
  </div>

  {/* Campo per l'Indirizzo Studio */}
  <div style={formStyles.formGroup}>
    <label style={formStyles.label}>Indirizzo Studio</label>
    <input
      style={formStyles.input}
      type="text"
      value={trainerData.studioAddress}
      onChange={(e) => setTrainerData({ ...trainerData, studioAddress: e.target.value })}
    />
  </div>

  {/* Campo per la Partita IVA Studio */}
  <div style={formStyles.formGroup}>
    <label style={formStyles.label}>Partita IVA Studio</label>
    <input
      style={formStyles.input}
      type="text"
      value={trainerData.studioVatNumber}
      onChange={(e) => setTrainerData({ ...trainerData, studioVatNumber: e.target.value })}
    />
  </div>   
      {/* Dati del cliente */}
      <h2>Inserisci i dati del cliente</h2>
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Nome Cliente</label>
        <input
          style={formStyles.input}
          type="text"
          value={clientData.name}
          onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
        />
      </div>
      
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Indirizzo Cliente</label>
        <input
          style={formStyles.input}
          type="text"
          value={clientData.address}
          onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
        />
      </div>
      
      {/* Servizi */}
      <h2>Servizi</h2>
      {services.map((service, index) => (
        <div key={index} style={formStyles.formGroup}>
          <input
            style={formStyles.input}
            type="text"
            placeholder="Descrizione"
            value={service.description}
            onChange={(e) => handleServiceChange(index, "description", e.target.value)}
          />
          
          <label style={formStyles.label}>Quantità</label>
          <input
            style={formStyles.input}
            type="number"
            placeholder="Quantità"
            min="0"
            value={service.quantity || ""}
            inputMode="numeric"
            onKeyPress={(e) => {
              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => handleServiceChange(index, "quantity", e.target.value)}
          />
          
          <label style={formStyles.label}>Prezzo</label>
          <input
            style={formStyles.input}
            type="number"
            placeholder="Prezzo Unitario (inclusa IVA)"
            value={service.unitPrice || ""}
            min="0"
            inputMode="numeric"
            onKeyPress={(e) => {
              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => handleServiceChange(index, "unitPrice", e.target.value)}
          />
        </div>
      ))}
      <button style={formStyles.buttonAdd} onClick={addService}>
        Aggiungi Servizio
      </button>
  
      {/* Bottone per scaricare il PDF */}
      <button style={formStyles.buttonDownload}>
        <PDFDownloadLink
          document={<InvoicePDF trainerData={trainerData} clientData={clientData} services={services} />}
          fileName="fattura.pdf"
        >
          {({ loading }) => (loading ? "Generazione PDF in corso..." : "Scarica Fattura PDF")}
        </PDFDownloadLink>
      </button>
    </div>
  );
  
  
};

export default TrainerForm;
