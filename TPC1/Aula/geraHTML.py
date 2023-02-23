import json

def ordCidade(cidade):
    return cidade["nome"]


f = open("mapa.json")

mapa = json.load(f)

cidades = mapa["cidades"]

cidades.sort(key=ordCidade)

ligacoes = mapa["ligações"]

cidades_dict = {}

for cidade in cidades:
    if cidade["id"] not in cidades_dict:
        cidades_dict[cidade["id"]] = cidade["nome"]

origens = {}
destinos = {}

for ligacao in ligacoes:
    if ligacao['destino'] not in origens:
        origens[ligacao['destino']] = list() 
    origens[ligacao['destino']].append((ligacao['origem'], ligacao['distância']))

    if ligacao['origem'] not in destinos:
        destinos[ligacao['origem']] = list()

    destinos[ligacao['origem']].append((ligacao['destino'], ligacao['distância']))

#print(origens)
#print(destinos)

pagHTML = """
<!DOCTYPE html>

<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
                <!-- Índice-->
                <td valign="top">
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ul>
"""

for c in cidades:
    pagHTML += f"""
    <li>
        <a href="#{c["id"]}">{c["nome"]}</a>
    </li>
    """

pagHTML += """
                    </ul>
                </td>
                <!-- Conteudo-->
                <td>
"""

for c in cidades:
    pagHTML += f"""
                    <a name="{c["id"]}"/>
                    <h3>{c["nome"]}</h3>
                    <p><b>População: </b>{c["população"]}</p>
                    <p><b>Descricção: </b>{c["descrição"]}</p>
                    <p><b>Distrito: </b>{c["distrito"]}</p>
                    <address>[<a href="#indice">Voltar ao indice</a>]
                    <center>
                        <hr width="80%"/>
                    </center>
                    <h4>Ligações</h4>
                    <table>
                        <td valign="top">
                            <p>Origens</p>
                            <ul>"""
    if c["id"] in origens:
        for o in origens[c["id"]]:
            pagHTML += f""" <li>
                                <p><a href="#{o[0]}">{cidades_dict[o[0]]}</a> - {o[1]}</p>
                            </li>
                        """

    pagHTML += f"""         </ul>
                        </td>
                        <td valign="top">
                            <p>Destinos</p>
                            <ul>"""

    if c["id"] in destinos:
        for d in destinos[c["id"]]:
            pagHTML += f""" <li>
                                <p><a href="#{d[0]}">{cidades_dict[d[0]]}</a>- {d[1]}</p>
                            </li>
                        """
                        
    pagHTML += f"""         </ul>    
                    </td>
                    </table>
    """

pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)