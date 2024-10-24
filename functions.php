<?php
function tarefas_com_timer_shortcode() {
    session_start();

    if (!isset($_SESSION['tarefas'])) {
        $_SESSION['tarefas'] = [];
    }

    $mensagem_sucesso = '';
    $cor_mensagem = '';

    if (isset($_POST['adicionar_tarefa'])) {
        $nova_tarefa = sanitize_text_field($_POST['tarefa']);
        $_SESSION['tarefas'][] = ['descricao' => $nova_tarefa, 'concluida' => false];
        $mensagem_sucesso = 'Tarefa Incluída com Sucesso!';
        $cor_mensagem = '#4CAF50';
    }

    if (isset($_POST['concluir_tarefa'])) {
        $index = (int) $_POST['index'];
        $_SESSION['tarefas'][$index]['concluida'] = true;
        $mensagem_sucesso = 'Tarefa Concluída com Sucesso!';
        $cor_mensagem = '#2196F3';
    }

    if (isset($_POST['excluir_tarefa'])) {
        $index = (int) $_POST['index'];
        unset($_SESSION['tarefas'][$index]);
        $_SESSION['tarefas'] = array_values($_SESSION['tarefas']);
        $mensagem_sucesso = 'Tarefa Excluída com Sucesso!';
        $cor_mensagem = '#f44336';
    }

    ob_start(); 
    include 'template.php';
    return ob_get_clean();
}

add_shortcode('gerenciador_tarefas_timer', 'tarefas_com_timer_shortcode');
?>
