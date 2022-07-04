# 高性能JITコンパイラ

## 概要

この演習では、Javaベンチマーク用アプリケーションをGraalVMのJITコンパイラと従来のC2コンパイラでそれぞれ実行し、両者のパフォーマンスを比較します。  
従来のJavaアプリケーションの実行方法は、java中間コード(javaクラス)をJVMにロードし、インタープリタ、C1コンパイラ、C2コンパイラを経てマシンコードに変換して実行されます。GraalVMの中で、C2コンパイラに代わってGraalコンパイラが新規に開発されました。コンパイルアルゴリズムが最適化され、従来よりも優れたパフォーマンスを達成する実行コードを生成することができます。代表的な最適化手法は以下となります。 
* Inlining:   クラスに対する内部解析に基づき、getter/setterメソッドの代わりに、実際の変数を特定し代入することにより、メソッドコールの回数を減らし、実行オーバヘッドを軽減します。
* Escape解析:   変数の適用範囲を特定し、実行オーバーヘッドの高いSynchronization作業を最低限に抑え、またローカル変数オブジェクトをJVMヒープからスタックに移動することで、JVMの使用メモリーを減らします。
* DeOptimization: 最適化対象クラスを自動的に見直すことによりパフォーマンスを高め、また不要となるオブジェクトを特定してキャッシュから除去することによりメモリー負担を軽減します。  

この演習の中で、JavaサンプルアプリケーションをGraalとC2の２つのコンパイラモードで実行し、両者のパフォーマンスを比較します。

*所要時間: 10分*

### ■目標
* GraalVMの高性能JITコンパイラでJavaアプリケーションを実行
* Javaベンチマークを実行し、GraalVMのJITコンパイラと従来のJITコンパイラのパフォーマンスを比較

### ■前提条件

* 演習１「GraalVMのインストール」を実施済みであること

## Task 1: サンプルアプリケーションの導入  

このサンプルはオープンソースのJavaベンチマークツールである[Java Microbenmark Harness(JMH)](https://github.com/openjdk/jmh)
を利用して、配列の各要素に対する単純な計算、集計を行うJavaプログラムです。  
プログラムを3回の反復実行による平均時間（ナノ秒）を計測します。GraalコンパイラとC2コンパイラでそれぞれ実行し、平均時間を比較します。

1. サンプルアプリケーションをダウンロードします。  
    <!--コマンドプロンプトを立ち上げ、SSHキーを保存しているディレクトリー配下より演習用インスタンスに接続します。
    
    ```
    <copy>ssh -i <your-private-key-file> opc@<x.x.x.x></copy>

    ``` 
    -->
    
    ```
    <copy>cd ~</copy>
    ```

    GitHubに公開されているGraalVMサンプルのリポジトリを複製します。

    ```
    <copy>git clone https://github.com/graalvm/graalvm-demos.git</copy>
    ```
    複製されたリポジトリに移動します。
    ```
    <copy>cd graalvm-demos</copy>
    ```
    今回使用するJavaベンチマークサンプル配下に移動します。
    ```
    <copy>cd java-simple-stream-benchmark</copy>
    ```

    > **Note:** 上記サンプル以外に、GraalVM関連の[複数サンプル](https://github.com/graalvm/graalvm-demos)を参照できます。

2. サンプルコードの中身を確認します。

    以下のコマンドでnanoエディタでサンプルソースの中身を確認します。

    ```
    <copy>nano src/main/java/org/graalvm/demos/JavaSimpleStreamBenchmark.java</copy>
    ```
    
    サンプルソースの中で、int型の配列の各要素に対し、Java Stream APIを利用して様々な計算処理を行います。  
    また[JMH](https://github.com/openjdk/jmh)の仕様に従ってウォームアップの回数(@Warmup)、反復回数(@Measurement)、計測対象モード（@BenchmarkMode）などのベンチマーク仕様をアノテーション形式で規定しています。

    ```
    package org.graalvm.demos;

    import org.openjdk.jmh.annotations.*;

    import java.util.Arrays;
    import java.util.concurrent.TimeUnit;

    @Warmup(iterations = 1)
    @Measurement(iterations = 3)
    @BenchmarkMode(Mode.AverageTime)
    @OutputTimeUnit(TimeUnit.NANOSECONDS)
    @Fork(1)
    public class JavaSimpleStreamBenchmark {

    static int[] values = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    @Benchmark
    public int testMethod() {
      return Arrays.stream(values)
        .map(x -> x + 1)
        .map(x -> x * 2)
        .map(x -> x + 2)
        .reduce(0, Integer::sum);
      }
    }
    ```
    CTRL+Xを押下し、nanoエディタからExitします。

    > **Note:** ファイルを編集後nanoエディタを終了する場合、nanoエディタの下部に表示されたショートカットキーを押します。CTRL+Xを押すことで、ファイルの編集内容を保存するかどうかをYesまたはNo、Cancelの形で尋ねられます。それぞれY、N、CTRL+Cで対応します。

## Task 2: ベンチマークを含むプロジェクトのビルドおよび実行

1. 演習１で導入したMavenを使用してプロジェクトをビルドします。

    以下のコマンドでmavenビルドに必要なライブラリをダウンロードします。
    ```
    <copy>cd ~</copy>
    ```
    ```
    <copy>
    wget https://objectstorage.us-ashburn-1.oraclecloud.com/p/LNAcA6wNFvhkvHGPcWIbKlyGkicSOVCIgWLIu6t7W2BQfwq2NSLCsXpTL9wVzjuP/n/c4u04/b/livelabsfiles/o/developer-library/m2.tar.gz
    </copy>
    ```
    ```
    <copy>tar zxvf  m2.tar.gz</copy>
    ```
    
    ```java-simple-stream-benchmark```配下に移動し、アプリケーションをビルドします。

    ```
    <copy>cd graalvm-demos/java-simple-stream-benchmark</copy>
    ```

    ```
    <copy>mvn clean package</copy>
    ```

2. 以下のコマンドを実行し、target配下にベンチマーク用jarファイルがビルドされていたことを確認します。

    ```
    <copy>ls -lh ./target</copy>
    ```

3. 現在のJava実行環境がGraalVMであることを確認した上、ベンチマークを実行します。
    ```
    <copy>java -version</copy>
    ```

    ```
    <copy>java -jar target/benchmarks.jar</copy>
    ```
    > **Note:** Java実行環境がGraalVMのため、上記javaコマンドの発行により、GraalVMのJITコンパイラが使用されます。

4. C2コンパイラを使用して、同じベンチマークを再度実行します。*-XX:-UseJVMCICompiler*というオプションを追加することにより、Graalコンパイラが使われず、従来のC2コンパイラが使用されます。

	```
  <copy>java -XX:-UseJVMCICompiler -jar target/benchmarks.jar</copy>
  ```
  Graalコンパイラと従来のC2コンパイラの実行結果Score（＝平均実行時間)を比較してみてください。

5. Graal JIT Compiler

    ```
    Benchmark                             Mode  Cnt   Score      Error  Units
  JavaSimpleStreamBenchmark.testMethod  avgt    3  48.108 ± 1198.011  ns/op
    ```

6. C2 Compiler

    ```
  Benchmark                             Mode  Cnt    Score    Error  Units
JavaSimpleStreamBenchmark.testMethod  avgt    3  250.740 ± 37.220  ns/op
    ```
  このベンチマークでは、Graal コンパイラのScore(＝平均実行時間)がC2コンパイラより5分の1に短縮された結果となっています。

  サンプルソースの中のアノテーション(@Measurementなど）を調整して、反復回数や表示モードを変更してベンチマークを実施してみてください。

## Learn More

*参考リンク*
* [graalvm-demos](https://github.com/graalvm/graalvm-demos)
* [Java Microbenmark Harness(JMH)](https://github.com/openjdk/jmh)

## Acknowledgements

- **Created By/Date** - Jun Suzuki, Java Global Business Unit, April 2022
- **Contributors** - James Connors, Madhusudhan Rao, David Start 
- **Last Updated By/Date** - Jun Suzuki, May 2022
