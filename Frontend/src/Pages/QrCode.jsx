import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function QrCode() {

    const [img, Setimg] = useState("");
    // loading text
    const [loading, Setloading] = useState(false);

    const [qrData, setQrData] = useState("");

    //image size here to start
    const [Qrsize, setQrsize] = useState("");

    //Genrate function here to start
    async function genraterQr() {
        Setloading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${Qrsize}x${Qrsize}&data=${encodeURIComponent(qrData)}`;
            Setimg(url);
        } catch (error) {
            console.error("Error generating QR code", error);
        } finally {
            Setloading(false);
        }
    }

    //download function here to start
    function downloadimage() {
        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })

    }

    return (
        <>
            <div className="app-container">
                <div className='sect-div'>
                    <Typography className='heading-text' component="h3"> QR Code Genrater </Typography>
                    {loading && <Typography>Please Wait...</Typography>}
                    {img && <img className='mb-3' src={img} alt="qrimage" />}

                    <Stack className='mb-3' alignItems="center" spacing={2} direction="row">
                        <Typography component="h2"> Data for Qr code : </Typography>
                        <TextField value={qrData} id="datainput" onChange={(e) => setQrData(e.target.value)} placeholder='Enter data for QR code' />
                    </Stack>

                    <Stack spacing={7} alignItems="center" direction="row">
                        <Typography component="h2"> Image size : </Typography>
                        <TextField  value={Qrsize} onChange={(e) => setQrsize(e.target.value)} id="sizeinput" placeholder='image size' />
                    </Stack>

                    <Stack className='mt-3' justifyContent={'center'} direction={"row"}>
                        <Button className='genbtn' onClick={genraterQr} disabled={loading}>Genrate QR Code</Button>
                        <Button className='downbtn ml-2' onClick={downloadimage}>Download QR</Button>
                    </Stack>
                </div>
            </div>
        </>
    )
}

export default QrCode