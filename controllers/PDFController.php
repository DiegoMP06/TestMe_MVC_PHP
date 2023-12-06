<?php 
namespace Controller;
use Clase\PDF;
use Model\Test;
use Model\Visita;

class PDFController {
    public static function visita() {
        isAuth();
        $id = $_GET["id"] ?? null;
        if(!$id) header("Location: /404");
        $visita = Visita::find($id);
        if(!$visita) header("Location: /404");
        if((int) $_SESSION["id"] !== (int) $visita->getUsuarioId()) header("Location: /404");
        $visita->setCamposExtra(json_decode($visita->getCamposExtra()));
        $visita->setCampos(json_decode($visita->getCampos()));
        $visita->setInstruccion(json_decode($visita->getinstruccion()));
        $test = Test::find($visita->getTestId());
        $test->setCampos(json_decode($test->getCampos()));
        $test->setInstrucciones(json_decode($test->getInstrucciones()));
        $test->setPreguntas(json_decode($test->getPreguntas()));
        $test->setOpciones(json_decode($test->getOpciones()));

        $pdf = new PDF;
        $pdf->crearPDFVisita($test, $visita);
    }
}