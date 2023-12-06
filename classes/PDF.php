<?php 
namespace Clase;

use Dompdf\Dompdf;

class PDF {
    public function crearPDFVisita($test, $visita) {
        $pdf = new Dompdf();
        $nombreTest = str_replace(" ", "_", $test->getNombre());
        $nombreTest = str_replace(".", "_", $nombreTest);
        
        ob_start();
        include_once __DIR__ . "/../views/PDF/reporteVisita.php";
        $html = ob_get_clean();
        
        $pdf->loadHtml($html);
        $pdf->setPaper("A4", "portrait");
        $pdf->render();
        $pdf->stream($nombreTest .".pdf", ["Attachment" => false]);
    }
}
