const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors());

app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.static(path.join(__dirname, 'modern')));

const config = {
    user: 'OJT',
    password: '123!@#qwe',
    server: '192.168.180.22',
    database: 'WMS-OJT',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

//DASHBOARD
app.get('/data', async (req, res) => {try {const pool = await sql.connect(config);
        const totalPalletsQuery = await pool.request().query('SELECT SUM(TotalPallets) AS TotalPallets FROM (SELECT COUNT(PalletID) AS TotalPallets FROM WMS.InboundDetail UNION ALL SELECT COUNT(PalletID) AS TotalPallets FROM WMS.OutboundDetail) AS TotalPallets;');
        const usedPalletsQuery = await pool.request().query('SELECT  SUM(UsedPallets) AS UsedPallets FROM ( SELECT COUNT(PalletID) - SUM(CASE WHEN PalletID IS NULL THEN 1 ELSE 0 END) AS UsedPallets FROM WMS.InboundDetail UNION ALL SELECT COUNT(PalletID) - SUM(CASE WHEN PalletID IS NULL THEN 1 ELSE 0 END) AS UsedPallets  FROM WMS.OutboundDetail) AS UsedPallets;');
        const emptyPalletsQuery = await pool.request().query('SELECT  (SELECT COUNT(*) FROM WMS.InboundDetail WHERE PalletID IS  NULL)  + (SELECT COUNT(*) FROM WMS.OutboundDetail WHERE PalletID IS  NULL) AS EmptyPallets;');
        const totalCapacityQuery = await pool.request().query('SELECT (SELECT COUNT(DocNumber) FROM WMS.Inbound) + (SELECT COUNT(DocNumber) FROM WMS.Outbound) AS TotalCapacity');
        const totalInboundQuery = await pool.request().query('SELECT COUNT(DocNumber) AS Inbound FROM WMS.Inbound');
        const totalOutboundQuery = await pool.request().query('SELECT COUNT(DocNumber) AS Outbound FROM WMS.Outbound');
        const totalmlibalQuery = await pool.request().query("SELECT COUNT(*) AS Total FROM WMS.CountSheetSetup WHERE WarehouseCode = 'MLIBAL'");
        const totalmlicavQuery = await pool.request().query("SELECT COUNT(*) AS Total FROM WMS.CountSheetSetup WHERE WarehouseCode = 'MLICAV'");
        const totalmlicav2Query = await pool.request().query("SELECT COUNT(*) AS Total FROM WMS.CountSheetSetup WHERE WarehouseCode = 'MLICAV2'");
        const totalmlicdoQuery = await pool.request().query("SELECT COUNT(*) AS Total FROM WMS.CountSheetSetup WHERE WarehouseCode = 'MLICDO'");
        const totalmlicebQuery = await pool.request().query("SELECT COUNT(*) AS Total FROM WMS.CountSheetSetup WHERE WarehouseCode = 'MLICEB'");

await pool.close();
        const totalPallets = totalPalletsQuery.recordset[0].TotalPallets;
        const usedPallets = usedPalletsQuery.recordset[0].UsedPallets;
        const emptyPallets = emptyPalletsQuery.recordset[0].EmptyPallets;
        const totalCapacity = totalCapacityQuery.recordset[0].TotalCapacity;
        const totalInbound = totalInboundQuery.recordset[0].Inbound;
        const totalOutbound = totalOutboundQuery.recordset[0].Outbound;
        const totalmlibal = totalmlibalQuery.recordset[0].Total;
        const totalmlicav = totalmlicavQuery.recordset[0].Total
        const totalmlicav2 = totalmlicav2Query.recordset[0].Total;
        const totalmlicdo = totalmlicdoQuery.recordset[0].Total;
        const totalmliceb = totalmlicebQuery.recordset[0].Total;
    
res.json({
            totalPallets: totalPallets,
            usedPallets: usedPallets,
            emptyPallets: emptyPallets,
            totalCapacity: totalCapacity,
            totalInbound: totalInbound,
            totalOutbound: totalOutbound,
            totalmlibal: totalmlibal,
            totalmlicav: totalmlicav,
            totalmlicav2: totalmlicav2,
            totalmlicdo: totalmlicdo,
            totalmliceb: totalmliceb, });
    } catch (error) {
        console.error('Error fetching overall data:', error);
        res.status(500).json({ error: 'An error occurred while fetching overall data' });
    }
});


//INBOUND
app.get('/inbound', async (req, res) => {try {const pool = await sql.connect(config);         
        const totalsubmittedQuery = await pool.request().query("SELECT COUNT(SubmittedBy) AS Submitted FROM WMS.Inbound;");
        const totalpendingQuery = await pool.request().query("SELECT COUNT(ApprovedBy) AS Pending FROM WMS.Inbound;");
        const totalacceptedQuery = await pool.request().query("SELECT COUNT(AcceptBy) AS Accepted FROM WMS.Inbound;");
        const totalholdQuery = await pool.request().query("SELECT COUNT(HoldReason) AS Hold FROM WMS.Inbound;");
        const totalcancelledQuery = await pool.request().query("SELECT COUNT(CancelledBy) AS Cancelled FROM WMS.Inbound;");
        const totalcoldQuery = await pool.request().query("SELECT COUNT(StorageType) AS Cold FROM WMS.Inbound WHERE StorageType = 'STORAGECOLD';");
        const totaldryQuery = await pool.request().query("SELECT COUNT(StorageType) AS Dry FROM WMS.Inbound WHERE StorageType = 'STORAGEDRY';");
        const totalchillerQuery = await pool.request().query("SELECT COUNT(StorageType) AS Chiller FROM WMS.Inbound WHERE StorageType = 'STORAGECHILLER';");
        const totalairconQuery = await pool.request().query("SELECT COUNT(*) AS Total FROM WMS.Inbound WHERE StorageType = 'STORAGEAIRCON'");
        const totaljanuaryQuery = await pool.request().query("SELECT COUNT(DocDate) AS January FROM WMS.Inbound WHERE MONTH(DocDate) = 01 AND YEAR(DocDate) = 2024");
        const totalfebruaryQuery = await pool.request().query("SELECT COUNT(DocDate) AS February FROM WMS.Inbound WHERE MONTH(DocDate) = 02 AND YEAR(DocDate) = 2024");
        const totalmarchQuery = await pool.request().query("SELECT COUNT(DocDate) AS March FROM WMS.Inbound WHERE MONTH(DocDate) = 03 AND YEAR(DocDate) = 2024");
        const totalaprilQuery = await pool.request().query("SELECT COUNT(DocDate) AS April FROM WMS.Inbound WHERE MONTH(DocDate) = 04 AND YEAR(DocDate) = 2024");
        const totalmayQuery = await pool.request().query("SELECT COUNT(DocDate) AS May FROM WMS.Inbound WHERE MONTH(DocDate) = 05 AND YEAR(DocDate) = 2024");
        const totaljuneQuery = await pool.request().query("SELECT COUNT(DocDate) AS June FROM WMS.Inbound WHERE MONTH(DocDate) = 06 AND YEAR(DocDate) = 2024");
        const totaljulyQuery = await pool.request().query("SELECT COUNT(DocDate) AS July FROM WMS.Inbound WHERE MONTH(DocDate) = 07 AND YEAR(DocDate) = 2024");
        const totalaugustQuery = await pool.request().query("SELECT COUNT(DocDate) AS August FROM WMS.Inbound WHERE MONTH(DocDate) = 08 AND YEAR(DocDate) = 2024");
        const totalseptemberQuery = await pool.request().query("SELECT COUNT(DocDate) AS September FROM WMS.Inbound WHERE MONTH(DocDate) = 09 AND YEAR(DocDate) = 2024");
        const totaloctoberQuery = await pool.request().query("SELECT COUNT(DocDate) AS October FROM WMS.Inbound WHERE MONTH(DocDate) = 10 AND YEAR(DocDate) = 2024");
        const totalnovemberQuery = await pool.request().query("SELECT COUNT(DocDate) AS November FROM WMS.Inbound WHERE MONTH(DocDate) = 11 AND YEAR(DocDate) = 2024");
        const totaldecemberQuery = await pool.request().query("SELECT COUNT(DocDate) AS December FROM WMS.Inbound WHERE MONTH(DocDate) = 12 AND YEAR(DocDate) = 2024");

await pool.close();
        const totalsubmitted = totalsubmittedQuery.recordset[0].Submitted;
        const totalpending = totalpendingQuery.recordset[0].Pending;
        const totalaccepted = totalacceptedQuery.recordset[0].Accepted;
        const totalhold = totalholdQuery.recordset[0].Hold;
        const totalcancelled = totalcancelledQuery.recordset[0].Cancelled;
        const totalcold = totalcoldQuery.recordset[0].Cold;
        const totaldry = totaldryQuery.recordset[0].Dry;
        const totalchiller = totalchillerQuery.recordset[0].Chiller;
        const totalaircon = totalairconQuery.recordset[0].Total;
        const totaljanuary = totaljanuaryQuery.recordset[0].January;
        const totalfebruary = totalfebruaryQuery.recordset[0].February;
        const totalmarch = totalmarchQuery.recordset[0].March;
        const totalapril = totalaprilQuery.recordset[0].April;
        const totalmay = totalmayQuery.recordset[0].May;
        const totaljune = totaljuneQuery.recordset[0].June;
        const totaljuly = totaljulyQuery.recordset[0].July;
        const totalaugust = totalaugustQuery.recordset[0].August;
        const totalseptember = totalseptemberQuery.recordset[0].September;
        const totaloctober = totaloctoberQuery.recordset[0].October;
        const totalnovember = totalnovemberQuery.recordset[0].November;
        const totaldecember = totaldecemberQuery.recordset[0].December;

res.json({
            totalsubmitted: totalsubmitted,
            totalpending: totalpending,
            totalaccepted: totalaccepted,
            totalhold: totalhold,
            totalcancelled: totalcancelled,
            totalcold: totalcold,
            totaldry: totaldry,
            totalchiller: totalchiller,
            totalaircon: totalaircon,
            totaljanuary: totaljanuary,
            totalfebruary: totalfebruary,
            totalmarch: totalmarch,
            totalapril: totalapril,
            totalmay: totalmay,
            totaljune: totaljune,
            totaljuly: totaljuly,
            totalaugust: totalaugust,
            totalseptember: totalseptember,
            totaloctober: totaloctober,
            totalnovember: totalnovember,
            totaldecember: totaldecember,});
    } catch (error) {
        console.error('Error fetching overall data:', error);
        res.status(500).json({ error: 'An error occurred while fetching overall data' });
    }
});


// OUTBOUND
app.get('/outbound', async (req, res) => {try {const pool = await sql.connect(config);
        const submittedQuery = await pool.request().query("SELECT COUNT(SubmittedBy) AS Submitted FROM WMS.Outbound;");
        const pendingQuery = await pool.request().query("SELECT COUNT(TotalQty) AS Pending FROM WMS.Outbound;");
        const acceptedQuery = await pool.request().query("SELECT COUNT(AcceptBy) AS Accepted FROM WMS.Outbound;");
        const holdQuery = await pool.request().query("SELECT COUNT(HoldReason) AS Hold FROM WMS.Outbound;");
        const cancelledQuery = await pool.request().query("SELECT COUNT(CancelledBy) AS Cancelled FROM WMS.Outbound;");
        const coldQuery = await pool.request().query("SELECT COUNT(StorageType) AS Cold FROM WMS.Outbound WHERE StorageType = 'STORAGECOLD';");
        const dryQuery = await pool.request().query("SELECT COUNT(StorageType) AS Dry FROM WMS.Outbound WHERE StorageType = 'STORAGEDRY';");
        const chillerQuery = await pool.request().query("SELECT COUNT(StorageType) AS Chiller FROM WMS.Outbound WHERE StorageType = 'STORAGECHILLER';");
        const airconQuery = await pool.request().query("SELECT COUNT(*) AS Total FROM WMS.Outbound WHERE StorageType = 'STORAGEAIRCON'");
        const januaryQuery = await pool.request().query("SELECT COUNT(DocDate) AS January FROM WMS.Outbound WHERE MONTH(DocDate) = 01 AND YEAR(DocDate) = 2024");
        const februaryQuery = await pool.request().query("SELECT COUNT(DocDate) AS February FROM WMS.Outbound WHERE MONTH(DocDate) = 02 AND YEAR(DocDate) = 2024");
        const marchQuery = await pool.request().query("SELECT COUNT(DocDate) AS March FROM WMS.Outbound WHERE MONTH(DocDate) = 03 AND YEAR(DocDate) = 2024");
        const aprilQuery = await pool.request().query("SELECT COUNT(DocDate) AS April FROM WMS.Outbound WHERE MONTH(DocDate) = 04 AND YEAR(DocDate) = 2024");
        const mayQuery = await pool.request().query("SELECT COUNT(DocDate) AS May FROM WMS.Outbound WHERE MONTH(DocDate) = 05 AND YEAR(DocDate) = 2024");
        const juneQuery = await pool.request().query("SELECT COUNT(DocDate) AS June FROM WMS.Outbound WHERE MONTH(DocDate) = 06 AND YEAR(DocDate) = 2024");
        const julyQuery = await pool.request().query("SELECT COUNT(DocDate) AS July FROM WMS.Outbound WHERE MONTH(DocDate) = 07 AND YEAR(DocDate) = 2024");
        const augustQuery = await pool.request().query("SELECT COUNT(DocDate) AS August FROM WMS.Outbound WHERE MONTH(DocDate) = 08 AND YEAR(DocDate) = 2024");
        const septemberQuery = await pool.request().query("SELECT COUNT(DocDate) AS September FROM WMS.Outbound WHERE MONTH(DocDate) = 09 AND YEAR(DocDate) = 2024");
        const octoberQuery = await pool.request().query("SELECT COUNT(DocDate) AS October FROM WMS.Outbound WHERE MONTH(DocDate) = 10 AND YEAR(DocDate) = 2024");
        const novemberQuery = await pool.request().query("SELECT COUNT(DocDate) AS November FROM WMS.Outbound WHERE MONTH(DocDate) = 11 AND YEAR(DocDate) = 2024");
        const decemberQuery = await pool.request().query("SELECT COUNT(DocDate) AS December FROM WMS.Outbound WHERE MONTH(DocDate) = 12 AND YEAR(DocDate) = 2024");

await pool.close();
        const submitted = submittedQuery.recordset[0].Submitted;
        const pending = pendingQuery.recordset[0].Pending;
        const accepted = acceptedQuery.recordset[0].Accepted;
        const hold = holdQuery.recordset[0].Hold;
        const cancelled = cancelledQuery.recordset[0].Cancelled;
        const cold = coldQuery.recordset[0].Cold;
        const dry = dryQuery.recordset[0].Dry;
        const chiller = chillerQuery.recordset[0].Chiller;
        const aircon = airconQuery.recordset[0].Total;
        const january = januaryQuery.recordset[0].January;
        const february = februaryQuery.recordset[0].February;
        const march = marchQuery.recordset[0].March;
        const april = aprilQuery.recordset[0].April;
        const may = mayQuery.recordset[0].May;
        const june = juneQuery.recordset[0].June;
        const july = julyQuery.recordset[0].July;
        const august = augustQuery.recordset[0].August;
        const september = septemberQuery.recordset[0].September;
        const october = octoberQuery.recordset[0].October;
        const november = novemberQuery.recordset[0].November;
        const december = decemberQuery.recordset[0].December;

 res.json({
        submitted: submitted,
        pending: pending,
        accepted: accepted,
        hold: hold,
        cancelled: cancelled,
        cold: cold,
        dry: dry,
        chiller: chiller,
        aircon: aircon,
        january: january,
        february: february,
        march: march,
        april: april,
        may: may,
        june: june,
        july: july,
        august: august,
        september: september,
        october: october,
        november: november,
         december: december,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

